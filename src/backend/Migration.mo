import Array "mo:base/Array";

module {
  public type AdmissionEnquiry = {
    name : Text;
    phone : Text;
    email : Text;
    course : Text;
    timestamp : Int;
  };

  public type Student = {
    studentId : Text;
    name : Text;
    phone : Text;
    email : Text;
    course : Text;
    enrollmentDate : Int;
    isActive : Bool;
  };

  public type Result = {
    studentId : Text;
    studentName : Text;
    examName : Text;
    score : Text;
    percentage : Float;
    year : Int;
  };

  public type GalleryImage = {
    imageId : Text;
    title : Text;
    description : Text;
    blobId : Text;
    uploadedAt : Int;
  };

  // Internal block-based structure used by mo:core/List
  type OldList<T> = {
    var blockIndex : Nat;
    var blocks : [var [var ?T]];
    var elementIndex : Nat;
  };

  func extractList<T>(old : OldList<T>) : [T] {
    if (old.blocks.size() == 0) { return []; };
    var result : [T] = [];
    var blockIdx = 0;
    while (blockIdx <= old.blockIndex) {
      if (blockIdx < old.blocks.size()) {
        let block = old.blocks[blockIdx];
        let limit = if (blockIdx < old.blockIndex) { block.size() } else { old.elementIndex };
        var elemIdx = 0;
        while (elemIdx < limit) {
          if (elemIdx < block.size()) {
            switch (block[elemIdx]) {
              case (?item) { result := Array.append(result, [item]); };
              case null {};
            };
          };
          elemIdx += 1;
        };
      };
      blockIdx += 1;
    };
    result
  };

  public func migration(
    old : {
      var admissionEnquiries : OldList<AdmissionEnquiry>;
      var studentsList : OldList<Student>;
      var images : OldList<GalleryImage>;
      var results : OldList<Result>;
    }
  ) : {
    var admissionEnquiries : [AdmissionEnquiry];
    var studentsList : [Student];
    var galleryImages : [GalleryImage];
    var resultsList : [Result];
  } {
    {
      var admissionEnquiries = extractList(old.admissionEnquiries);
      var studentsList = extractList(old.studentsList);
      var galleryImages = extractList(old.images);
      var resultsList = extractList(old.results);
    }
  };
}
