import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface AdmissionEnquiry {
    name: string;
    email: string;
    timestamp: bigint;
    phone: string;
    course: string;
}
export interface Result {
    studentId: string;
    studentName: string;
    year: bigint;
    score: string;
    examName: string;
    percentage: number;
}
export interface GalleryImage {
    title: string;
    description: string;
    blobId: string;
    imageId: string;
    uploadedAt: bigint;
}
export interface StudentInput {
    studentId: string;
    name: string;
    isActive: boolean;
    email: string;
    enrollmentDate: bigint;
    phone: string;
    course: string;
}
export interface UserProfile {
    name: string;
}
export interface Student {
    studentId: string;
    name: string;
    isActive: boolean;
    email: string;
    enrollmentDate: bigint;
    phone: string;
    course: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addGalleryImage(image: GalleryImage): Promise<void>;
    addResult(result: Result): Promise<void>;
    addStudent(input: StudentInput): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deactivateStudent(studentId: string): Promise<void>;
    getAllAdmissionEnquiries(): Promise<Array<AdmissionEnquiry>>;
    getAllGalleryImages(): Promise<Array<GalleryImage>>;
    getAllResults(): Promise<Array<Result>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getResultsByExam(examName: string): Promise<Array<Result>>;
    getResultsByStudent(studentId: string): Promise<Array<Result>>;
    getStudents(): Promise<Array<Student>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    removeGalleryImage(imageId: string): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitAdmissionEnquiry(enquiry: AdmissionEnquiry): Promise<void>;
    updateStudent(studentId: string, updatedStudent: StudentInput): Promise<void>;
}
