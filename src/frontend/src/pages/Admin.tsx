import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Lock, Plus, RefreshCw, Trash2 } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import type {
  AdmissionEnquiry,
  GalleryImage,
  Result,
  Student,
} from "../backend.d";
import { useActor } from "../hooks/useActor";

// ICP Time.now() returns nanoseconds; convert to ms for JS Date
function formatDate(ts: bigint) {
  const ms = Number(ts / 1_000_000n);
  return new Date(ms).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function Admin() {
  const { actor, isFetching } = useActor();
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [enquiries, setEnquiries] = useState<AdmissionEnquiry[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [results, setResults] = useState<Result[]>([]);
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [deletingEnquiry, setDeletingEnquiry] = useState<bigint | null>(null);
  const [confirmDeleteTimestamp, setConfirmDeleteTimestamp] = useState<
    bigint | null
  >(null);
  const [deleteError, setDeleteError] = useState("");
  const [newResult, setNewResult] = useState({
    studentId: "",
    studentName: "",
    examName: "",
    score: "",
    percentage: "",
    year: "",
  });
  const [addingResult, setAddingResult] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "aimers@tution") {
      setAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Incorrect password");
    }
  };

  useEffect(() => {
    if (!authenticated) return;
    if (isFetching || !actor) return;
    const init = async () => {
      try {
        const [eq, st, res, gal] = await Promise.all([
          actor.getAllAdmissionEnquiries(),
          actor.getStudents(),
          actor.getAllResults(),
          actor.getAllGalleryImages(),
        ]);
        setEnquiries(eq);
        setStudents(st);
        setResults(res);
        setGallery(gal);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [actor, isFetching, authenticated]);

  const refreshData = async () => {
    if (!actor) return;
    setRefreshing(true);
    try {
      const [eq, st, res, gal] = await Promise.all([
        actor.getAllAdmissionEnquiries(),
        actor.getStudents(),
        actor.getAllResults(),
        actor.getAllGalleryImages(),
      ]);
      setEnquiries(eq);
      setStudents(st);
      setResults(res);
      setGallery(gal);
    } finally {
      setRefreshing(false);
    }
  };

  const performDeleteEnquiry = async (timestamp: bigint) => {
    if (!actor) return;
    setConfirmDeleteTimestamp(null);
    setDeletingEnquiry(timestamp);
    setDeleteError("");
    try {
      await actor.deleteAdmissionEnquiry(timestamp);
      setEnquiries((prev) => prev.filter((e) => e.timestamp !== timestamp));
    } catch (err) {
      setDeleteError(`Delete failed: ${String(err)}`);
    } finally {
      setDeletingEnquiry(null);
    }
  };

  const deactivateStudent = async (id: string) => {
    if (!actor) return;
    await actor.deactivateStudent(id);
    setStudents((prev) =>
      prev.map((s) => (s.studentId === id ? { ...s, isActive: false } : s)),
    );
  };

  const removeImage = async (id: string) => {
    if (!actor) return;
    await actor.removeGalleryImage(id);
    setGallery((prev) => prev.filter((g) => g.imageId !== id));
  };

  const addResult = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) return;
    setAddingResult(true);
    try {
      const r: Result = {
        studentId: newResult.studentId,
        studentName: newResult.studentName,
        examName: newResult.examName,
        score: newResult.score,
        percentage: Number.parseFloat(newResult.percentage),
        year: BigInt(newResult.year || Date.now()),
      };
      await actor.addResult(r);
      setResults((prev) => [...prev, r]);
      setNewResult({
        studentId: "",
        studentName: "",
        examName: "",
        score: "",
        percentage: "",
        year: "",
      });
    } finally {
      setAddingResult(false);
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-2xl shadow-lg border border-[#E6EAF1] w-full max-w-sm p-8"
        >
          <div className="flex flex-col items-center mb-6">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mb-3"
              style={{
                background: "linear-gradient(135deg, #1F5EA8, #0B2F57)",
              }}
            >
              <Lock className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-[#0B2F57]">Admin Login</h2>
            <p className="text-sm text-gray-500 mt-1">
              Enter your password to continue
            </p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="admin-password"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                data-ocid="admin.input"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setAuthError("");
                }}
                placeholder="Enter admin password"
                className="w-full px-4 py-2.5 rounded-lg border border-[#E6EAF1] text-sm focus:outline-none focus:ring-2 focus:ring-[#1F5EA8] transition-shadow"
              />
            </div>
            {authError && (
              <p
                data-ocid="admin.error_state"
                className="text-red-500 text-sm font-medium"
              >
                {authError}
              </p>
            )}
            <button
              type="submit"
              data-ocid="admin.submit_button"
              className="w-full py-2.5 rounded-lg font-semibold text-white text-sm transition-colors hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, #1F5EA8, #0B2F57)",
              }}
            >
              Login
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  if (loading || isFetching) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2
          data-ocid="admin.loading_state"
          className="w-8 h-8 animate-spin text-[#1F5EA8]"
        />
      </div>
    );
  }

  const resultFields: Array<[keyof typeof newResult, string, string]> = [
    ["studentId", "Student ID", "text"],
    ["studentName", "Student Name", "text"],
    ["examName", "Exam Name", "text"],
    ["score", "Score", "text"],
    ["percentage", "Percentage", "number"],
    ["year", "Year (optional)", "number"],
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div
        className="py-8"
        style={{ background: "linear-gradient(135deg, #1F5EA8, #0B2F57)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-blue-200 text-sm">
              Manage admissions, students, results, and gallery
            </p>
          </div>
          <button
            type="button"
            onClick={refreshData}
            disabled={refreshing}
            data-ocid="admin.secondary_button"
            className="flex items-center gap-2 px-4 py-2 border border-white/40 text-white rounded-lg text-sm font-medium hover:bg-white/10 transition-colors disabled:opacity-60"
          >
            <RefreshCw
              className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
            />
            {refreshing ? "Refreshing…" : "Refresh"}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="admissions" data-ocid="admin.tab">
          <TabsList className="mb-6 bg-white border border-[#E6EAF1] shadow-xs">
            <TabsTrigger value="admissions" data-ocid="admin.tab">
              Admissions
            </TabsTrigger>
            <TabsTrigger value="students" data-ocid="admin.tab">
              Students
            </TabsTrigger>
            <TabsTrigger value="results" data-ocid="admin.tab">
              Results
            </TabsTrigger>
            <TabsTrigger value="gallery" data-ocid="admin.tab">
              Gallery
            </TabsTrigger>
          </TabsList>

          {/* Admissions */}
          <TabsContent value="admissions">
            <div className="bg-white rounded-xl border border-[#E6EAF1] shadow-card overflow-hidden">
              <div className="p-5 border-b border-[#E6EAF1]">
                <h2 className="font-bold text-[#0B2F57]">
                  Admission Enquiries ({enquiries.length})
                </h2>
              </div>
              {enquiries.length === 0 ? (
                <div
                  data-ocid="admissions.empty_state"
                  className="p-10 text-center text-gray-400"
                >
                  No enquiries yet.
                </div>
              ) : (
                <>
                  {deleteError && (
                    <div
                      className="mx-5 mt-3 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm"
                      data-ocid="admissions.error_state"
                    >
                      {deleteError}
                    </div>
                  )}
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-50 text-left text-xs text-gray-500 uppercase tracking-wide">
                          <th className="px-5 py-3">#</th>
                          <th className="px-5 py-3">Name</th>
                          <th className="px-5 py-3">Phone</th>
                          <th className="px-5 py-3">Email</th>
                          <th className="px-5 py-3">Course</th>
                          <th className="px-5 py-3">Date Submitted</th>
                          <th className="px-5 py-3">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {enquiries.map((e, i) => (
                          <tr
                            key={`enq-${e.email}-${i}`}
                            data-ocid={`admissions.row.${i + 1}`}
                            className="border-t border-[#E6EAF1] hover:bg-gray-50"
                          >
                            <td className="px-5 py-3 text-gray-400">{i + 1}</td>
                            <td className="px-5 py-3 font-medium text-[#0B2F57]">
                              {e.name}
                            </td>
                            <td className="px-5 py-3 text-gray-600">
                              {e.phone}
                            </td>
                            <td className="px-5 py-3 text-gray-600">
                              {e.email}
                            </td>
                            <td className="px-5 py-3">
                              <span className="px-2 py-1 bg-blue-50 text-[#1F5EA8] rounded text-xs font-semibold">
                                {e.course}
                              </span>
                            </td>
                            <td className="px-5 py-3 text-gray-500 whitespace-nowrap">
                              {formatDate(e.timestamp)}
                            </td>
                            <td className="px-5 py-3">
                              {confirmDeleteTimestamp === e.timestamp ? (
                                <div className="flex items-center gap-2">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      performDeleteEnquiry(e.timestamp)
                                    }
                                    disabled={deletingEnquiry === e.timestamp}
                                    data-ocid={`admissions.confirm_button.${i + 1}`}
                                    className="px-2 py-1 text-xs font-semibold text-white bg-red-500 hover:bg-red-600 rounded transition-colors disabled:opacity-50"
                                  >
                                    {deletingEnquiry === e.timestamp ? (
                                      <Loader2 className="w-3 h-3 animate-spin" />
                                    ) : (
                                      "Confirm"
                                    )}
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setConfirmDeleteTimestamp(null)
                                    }
                                    data-ocid={`admissions.cancel_button.${i + 1}`}
                                    className="px-2 py-1 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() =>
                                    setConfirmDeleteTimestamp(e.timestamp)
                                  }
                                  disabled={deletingEnquiry === e.timestamp}
                                  data-ocid={`admissions.delete_button.${i + 1}`}
                                  className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 font-medium disabled:opacity-50 transition-colors"
                                >
                                  {deletingEnquiry === e.timestamp ? (
                                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                  ) : (
                                    <Trash2 className="w-3.5 h-3.5" />
                                  )}
                                  Delete
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          </TabsContent>

          {/* Students */}
          <TabsContent value="students">
            <div className="bg-white rounded-xl border border-[#E6EAF1] shadow-card overflow-hidden">
              <div className="p-5 border-b border-[#E6EAF1]">
                <h2 className="font-bold text-[#0B2F57]">
                  Students ({students.length})
                </h2>
              </div>
              {students.length === 0 ? (
                <div
                  data-ocid="students.empty_state"
                  className="p-10 text-center text-gray-400"
                >
                  No students enrolled yet.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 text-left text-xs text-gray-500 uppercase tracking-wide">
                        <th className="px-5 py-3">Name</th>
                        <th className="px-5 py-3">Email</th>
                        <th className="px-5 py-3">Course</th>
                        <th className="px-5 py-3">Status</th>
                        <th className="px-5 py-3">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((s, i) => (
                        <tr
                          key={s.studentId}
                          data-ocid={`students.row.${i + 1}`}
                          className="border-t border-[#E6EAF1] hover:bg-gray-50"
                        >
                          <td className="px-5 py-3 font-medium text-[#0B2F57]">
                            {s.name}
                          </td>
                          <td className="px-5 py-3 text-gray-600">{s.email}</td>
                          <td className="px-5 py-3 text-gray-600">
                            {s.course}
                          </td>
                          <td className="px-5 py-3">
                            <span
                              className={`px-2 py-1 rounded text-xs font-semibold ${s.isActive ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"}`}
                            >
                              {s.isActive ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td className="px-5 py-3">
                            {s.isActive && (
                              <button
                                type="button"
                                onClick={() => deactivateStudent(s.studentId)}
                                data-ocid={`students.delete_button.${i + 1}`}
                                className="text-xs text-red-500 hover:text-red-700 font-medium"
                              >
                                Deactivate
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Results */}
          <TabsContent value="results">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-xl border border-[#E6EAF1] shadow-card overflow-hidden">
                <div className="p-5 border-b border-[#E6EAF1]">
                  <h2 className="font-bold text-[#0B2F57]">
                    Results ({results.length})
                  </h2>
                </div>
                {results.length === 0 ? (
                  <div
                    data-ocid="results.empty_state"
                    className="p-10 text-center text-gray-400"
                  >
                    No results added yet.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-50 text-left text-xs text-gray-500 uppercase tracking-wide">
                          <th className="px-5 py-3">Student</th>
                          <th className="px-5 py-3">Exam</th>
                          <th className="px-5 py-3">Score</th>
                          <th className="px-5 py-3">%</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.map((r, i) => (
                          <tr
                            key={`${r.studentId}-${r.examName}`}
                            data-ocid={`results.row.${i + 1}`}
                            className="border-t border-[#E6EAF1] hover:bg-gray-50"
                          >
                            <td className="px-5 py-3 font-medium text-[#0B2F57]">
                              {r.studentName}
                            </td>
                            <td className="px-5 py-3 text-gray-600">
                              {r.examName}
                            </td>
                            <td className="px-5 py-3 text-gray-600">
                              {r.score}
                            </td>
                            <td className="px-5 py-3">
                              <span className="font-semibold text-[#1F5EA8]">
                                {r.percentage}%
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Add Result Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-xl border border-[#E6EAF1] shadow-card p-6"
              >
                <h3 className="font-bold text-[#0B2F57] mb-4 flex items-center gap-2">
                  <Plus className="w-4 h-4 text-[#1F5EA8]" /> Add Result
                </h3>
                <form onSubmit={addResult} className="space-y-3">
                  {resultFields.map(([key, label, type]) => (
                    <div key={key}>
                      <label
                        htmlFor={`result-${key}`}
                        className="block text-xs font-semibold text-gray-600 mb-1"
                      >
                        {label}
                      </label>
                      <input
                        id={`result-${key}`}
                        type={type}
                        data-ocid="results.input"
                        value={newResult[key]}
                        onChange={(e) =>
                          setNewResult({ ...newResult, [key]: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-lg border border-[#E6EAF1] text-sm focus:outline-none focus:ring-2 focus:ring-[#1F5EA8]"
                      />
                    </div>
                  ))}
                  <button
                    type="submit"
                    disabled={addingResult}
                    data-ocid="results.submit_button"
                    className="w-full py-2.5 bg-[#1F5EA8] text-white font-semibold rounded-lg text-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {addingResult && (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    )}
                    Add Result
                  </button>
                </form>
              </motion.div>
            </div>
          </TabsContent>

          {/* Gallery */}
          <TabsContent value="gallery">
            <div className="bg-white rounded-xl border border-[#E6EAF1] shadow-card p-6">
              <div className="mb-5">
                <h2 className="font-bold text-[#0B2F57]">
                  Gallery Images ({gallery.length})
                </h2>
              </div>
              {gallery.length === 0 ? (
                <div
                  data-ocid="gallery.empty_state"
                  className="py-10 text-center text-gray-400"
                >
                  No gallery images yet.
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {gallery.map((img, i) => (
                    <div
                      key={img.imageId}
                      data-ocid={`gallery.item.${i + 1}`}
                      className="group relative rounded-xl overflow-hidden border border-[#E6EAF1]"
                    >
                      <div className="h-36 bg-gray-100 flex items-center justify-center">
                        <span className="text-gray-400 text-xs text-center px-2">
                          {img.title}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeImage(img.imageId)}
                        data-ocid={`gallery.delete_button.${i + 1}`}
                        className="absolute top-2 right-2 w-7 h-7 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
