# Aimers Group Tuition

## Current State
The delete enquiry function in the backend uses a lazy iterator from `.filter()`, then calls `.clear()` before iterating, which destroys the data the iterator references -- so nothing gets re-added and the list ends up empty or unchanged depending on runtime behavior.

## Requested Changes (Diff)

### Add
- Nothing new

### Modify
- `deleteAdmissionEnquiry`: Materialize the filtered result into an array with `.toArray()` before calling `admissionEnquiries.clear()`, then iterate the array to re-add items.

### Remove
- Nothing

## Implementation Plan
1. Fix `deleteAdmissionEnquiry` in `main.mo` to call `.toArray()` before `.clear()`.
