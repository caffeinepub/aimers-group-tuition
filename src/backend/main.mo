import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";
import MixinStorage "blob-storage/Mixin";
import Map "mo:core/Map";
import Int "mo:core/Int";
import Time "mo:core/Time";
import List "mo:core/List";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";

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

  let admissionEnquiries = List.empty<AdmissionEnquiry>();

  public query func getAllAdmissionEnquiries() : async [AdmissionEnquiry] {
    admissionEnquiries.values().toArray();
  };

  public shared func submitAdmissionEnquiry(enquiry : AdmissionEnquiry) : async () {
    let enquiryWithTimestamp = {
      enquiry with
      timestamp = Time.now();
    };
    admissionEnquiries.add(enquiryWithTimestamp);
  };

  public shared func deleteAdmissionEnquiry(timestamp : Int) : async () {
    // Materialize to array BEFORE clearing to avoid lazy-iterator-after-clear bug
    let toKeep = admissionEnquiries.values().filter(
      func(e : AdmissionEnquiry) : Bool { e.timestamp != timestamp }
    ).toArray();
    admissionEnquiries.clear();
    for (e in toKeep.values()) {
      admissionEnquiries.add(e);
    };
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

  let studentsList = List.empty<Student>();

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
    studentsList.add(student);
  };

  public shared func updateStudent(studentId : Text, updatedStudent : StudentInput) : async () {
    let updated = studentsList.values().map(
      func(s : Student) : Student {
        if (s.studentId == studentId) {
          {
            studentId = studentId;
            name = updatedStudent.name;
            phone = updatedStudent.phone;
            email = updatedStudent.email;
            course = updatedStudent.course;
            enrollmentDate = s.enrollmentDate;
            isActive = true;
          };
        } else { s };
      }
    ).toArray();
    studentsList.clear();
    for (student in updated.values()) {
      studentsList.add(student);
    };
  };

  public shared func deactivateStudent(studentId : Text) : async () {
    let updated = studentsList.values().map(
      func(s : Student) : Student {
        if (s.studentId == studentId) {
          { s with isActive = false };
        } else { s };
      }
    ).toArray();
    studentsList.clear();
    for (student in updated.values()) {
      studentsList.add(student);
    };
  };

  public query func getStudents() : async [Student] {
    studentsList.values().toArray();
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

  let results = List.empty<Result>();

  public shared func addResult(result : Result) : async () {
    results.add(result);
  };

  public query func getAllResults() : async [Result] {
    results.values().toArray();
  };

  public query func getResultsByStudent(studentId : Text) : async [Result] {
    results.values().filter(
      func(r : Result) : Bool { r.studentId == studentId }
    ).toArray();
  };

  public query func getResultsByExam(examName : Text) : async [Result] {
    results.values().filter(
      func(r : Result) : Bool { r.examName == examName }
    ).toArray();
  };

  // ---------- Gallery ----------

  type GalleryImage = {
    imageId : Text;
    title : Text;
    description : Text;
    blobId : Text;
    uploadedAt : Int;
  };

  let images = List.empty<GalleryImage>();

  public shared func addGalleryImage(image : GalleryImage) : async () {
    let imageWithTimestamp = {
      image with
      uploadedAt = Time.now();
    };
    images.add(imageWithTimestamp);
  };

  public shared func removeGalleryImage(imageId : Text) : async () {
    let toKeep = images.values().filter(
      func(i : GalleryImage) : Bool { i.imageId != imageId }
    ).toArray();
    images.clear();
    for (image in toKeep.values()) {
      images.add(image);
    };
  };

  public query func getAllGalleryImages() : async [GalleryImage] {
    images.values().toArray();
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
