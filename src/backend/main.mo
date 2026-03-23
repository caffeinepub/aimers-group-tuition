import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";
import MixinStorage "blob-storage/Mixin";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Buffer "mo:base/Buffer";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  // ---------- Admission Enquiries ----------

  type AdmissionEnquiry = {
    name : Text;
    phone : Text;
    email : Text;
    course : Text;
    timestamp : Int;
  };

  stable var admissionEnquiries : [AdmissionEnquiry] = [];

  public query func getAllAdmissionEnquiries() : async [AdmissionEnquiry] {
    admissionEnquiries;
  };

  public shared func submitAdmissionEnquiry(enquiry : AdmissionEnquiry) : async () {
    let entry : AdmissionEnquiry = {
      name = enquiry.name;
      phone = enquiry.phone;
      email = enquiry.email;
      course = enquiry.course;
      timestamp = Time.now();
    };
    let buf = Buffer.Buffer<AdmissionEnquiry>(admissionEnquiries.size() + 1);
    for (e in admissionEnquiries.vals()) { buf.add(e); };
    buf.add(entry);
    admissionEnquiries := Buffer.toArray(buf);
  };

  public shared func deleteAdmissionEnquiry(timestamp : Int) : async () {
    let buf = Buffer.Buffer<AdmissionEnquiry>(admissionEnquiries.size());
    for (e in admissionEnquiries.vals()) {
      if (e.timestamp != timestamp) {
        buf.add(e);
      };
    };
    admissionEnquiries := Buffer.toArray(buf);
  };

  // ---------- Student Records ----------

  type Student = {
    studentId : Text;
    name : Text;
    phone : Text;
    email : Text;
    course : Text;
    enrollmentDate : Int;
    isActive : Bool;
  };

  stable var studentsList : [Student] = [];

  public type StudentInput = {
    studentId : Text;
    name : Text;
    phone : Text;
    email : Text;
    course : Text;
    enrollmentDate : Int;
    isActive : Bool;
  };

  public shared func addStudent(input : StudentInput) : async () {
    let student : Student = {
      studentId = input.studentId;
      name = input.name;
      phone = input.phone;
      email = input.email;
      course = input.course;
      enrollmentDate = Time.now();
      isActive = true;
    };
    let buf = Buffer.Buffer<Student>(studentsList.size() + 1);
    for (s in studentsList.vals()) { buf.add(s); };
    buf.add(student);
    studentsList := Buffer.toArray(buf);
  };

  public shared func updateStudent(studentId : Text, updatedStudent : StudentInput) : async () {
    let buf = Buffer.Buffer<Student>(studentsList.size());
    for (s in studentsList.vals()) {
      if (s.studentId == studentId) {
        buf.add({
          studentId = studentId;
          name = updatedStudent.name;
          phone = updatedStudent.phone;
          email = updatedStudent.email;
          course = updatedStudent.course;
          enrollmentDate = s.enrollmentDate;
          isActive = true;
        });
      } else {
        buf.add(s);
      };
    };
    studentsList := Buffer.toArray(buf);
  };

  public shared func deactivateStudent(studentId : Text) : async () {
    let buf = Buffer.Buffer<Student>(studentsList.size());
    for (s in studentsList.vals()) {
      if (s.studentId == studentId) {
        buf.add({
          studentId = s.studentId;
          name = s.name;
          phone = s.phone;
          email = s.email;
          course = s.course;
          enrollmentDate = s.enrollmentDate;
          isActive = false;
        });
      } else {
        buf.add(s);
      };
    };
    studentsList := Buffer.toArray(buf);
  };

  public query func getStudents() : async [Student] {
    studentsList;
  };

  // ---------- Results ----------

  type Result = {
    studentId : Text;
    studentName : Text;
    examName : Text;
    score : Text;
    percentage : Float;
    year : Int;
  };

  stable var resultsList : [Result] = [];

  public shared func addResult(result : Result) : async () {
    let buf = Buffer.Buffer<Result>(resultsList.size() + 1);
    for (r in resultsList.vals()) { buf.add(r); };
    buf.add(result);
    resultsList := Buffer.toArray(buf);
  };

  public query func getAllResults() : async [Result] {
    resultsList;
  };

  public query func getResultsByStudent(studentId : Text) : async [Result] {
    let buf = Buffer.Buffer<Result>(resultsList.size());
    for (r in resultsList.vals()) {
      if (r.studentId == studentId) { buf.add(r); };
    };
    Buffer.toArray(buf);
  };

  public query func getResultsByExam(examName : Text) : async [Result] {
    let buf = Buffer.Buffer<Result>(resultsList.size());
    for (r in resultsList.vals()) {
      if (r.examName == examName) { buf.add(r); };
    };
    Buffer.toArray(buf);
  };

  // ---------- Gallery ----------

  type GalleryImage = {
    imageId : Text;
    title : Text;
    description : Text;
    blobId : Text;
    uploadedAt : Int;
  };

  stable var galleryImages : [GalleryImage] = [];

  public shared func addGalleryImage(image : GalleryImage) : async () {
    let entry : GalleryImage = {
      imageId = image.imageId;
      title = image.title;
      description = image.description;
      blobId = image.blobId;
      uploadedAt = Time.now();
    };
    let buf = Buffer.Buffer<GalleryImage>(galleryImages.size() + 1);
    for (g in galleryImages.vals()) { buf.add(g); };
    buf.add(entry);
    galleryImages := Buffer.toArray(buf);
  };

  public shared func removeGalleryImage(imageId : Text) : async () {
    let buf = Buffer.Buffer<GalleryImage>(galleryImages.size());
    for (g in galleryImages.vals()) {
      if (g.imageId != imageId) { buf.add(g); };
    };
    galleryImages := Buffer.toArray(buf);
  };

  public query func getAllGalleryImages() : async [GalleryImage] {
    galleryImages;
  };

  // ---------- Custom User Profile ----------

  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };
};
