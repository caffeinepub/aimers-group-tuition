import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";
import MixinStorage "blob-storage/Mixin";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
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
    let student = {
      input with
      enrollmentDate = Time.now() : Int;
      isActive = true;
    };
    studentsList.add(student);
  };

  public shared func updateStudent(studentId : Text, updatedStudent : StudentInput) : async () {
    let studentsArray = studentsList.toArray();
    let updatedArray = studentsArray.map(
      func(s) {
        if (s.studentId == studentId) {
          {
            updatedStudent with
            studentId;
            enrollmentDate = s.enrollmentDate;
            isActive = true;
          };
        } else { s };
      }
    );
    let newStudentsList = List.fromArray<Student>(updatedArray);
    studentsList.clear();
    for (student in newStudentsList.values()) {
      studentsList.add(student);
    };
  };

  public shared func deactivateStudent(studentId : Text) : async () {
    let studentsArray = studentsList.toArray();
    let updatedArray = studentsArray.map(
      func(s) {
        if (s.studentId == studentId) {
          {
            s with
            isActive = false;
          };
        } else { s };
      }
    );
    let newStudentsList = List.fromArray<Student>(updatedArray);
    studentsList.clear();
    for (student in newStudentsList.values()) {
      studentsList.add(student);
    };
  };

  public query func getStudents() : async [Student] {
    studentsList.toArray();
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
    results.toArray();
  };

  public query func getResultsByStudent(studentId : Text) : async [Result] {
    results.toArray().filter(func(r) { r.studentId == studentId });
  };

  public query func getResultsByExam(examName : Text) : async [Result] {
    results.toArray().filter(func(r) { r.examName == examName });
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
    let imagesArray = images.toArray();
    let updatedArray = imagesArray.filter(
      func(i) {
        i.imageId != imageId;
      }
    );
    let newImagesList = List.fromArray<GalleryImage>(updatedArray);
    images.clear();
    for (image in newImagesList.values()) {
      images.add(image);
    };
  };

  public query func getAllGalleryImages() : async [GalleryImage] {
    images.toArray();
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
