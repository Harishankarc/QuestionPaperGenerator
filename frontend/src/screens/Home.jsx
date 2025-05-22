import { useState } from "react";
import { Eye, Pencil, Trash2 ,ArrowDownToLine} from "lucide-react";
import mockQuestions from "../data/data";
import { jsPDF } from 'jspdf';
import { autoTable } from 'jspdf-autotable';

export default function Home() {
  const [isAdmin, setIsAdmin] = useState(true);
  const [questions, setQuestions] = useState(mockQuestions);
  const [modalType, setModalType] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [formData, setFormData] = useState({
    question: "",
    difficulty: "Easy",
    subject: "",
    topic: "",
    marks: ""
  });
  const [filters, setFilters] = useState({
    topic: "",
    difficulty: "",
    subject: "",
  });
  const [paperCriteria, setPaperCriteria] = useState({
    subject: "",
    difficulty: "",
    numberOfQuestions: 5,
  });
  const [generatedPaper, setGeneratedPaper] = useState([]);

  function openModal(type, question = null) {
    setModalType(type);
    setCurrentQuestion(question);
    if (type === "edit" || type === "add") {
      setFormData(
        question
          ? { ...question }
          : {
            question: "",
            difficulty: "Easy",
            subject: "",
            topic: "",
            marks:""
          }
      );
    }
  }

  function closeModal() {
    setModalType(null);
    setCurrentQuestion(null);
    setFormData({
      question: "",
      difficulty: "Easy",
      subject: "",
      topic: "",
    });
    setGeneratedPaper([]);
  }

  function handleAdd() {
    setQuestions([...questions, { ...formData, id: Date.now() }]);
    closeModal();
  }

  function handleEdit() {
    setQuestions(
      questions.map((q) =>
        q.id === currentQuestion.id ? { ...q, ...formData } : q
      )
    );
    closeModal();
  }

  function handleDelete(id) {
    setQuestions(questions.filter((q) => q.id !== id));
  }

  function generateQuestionPaper() {
    const filtered = questions.filter(
      (q) =>
        (paperCriteria.subject === "" ||
          q.subject.toLowerCase() === paperCriteria.subject.toLowerCase()) &&
        (paperCriteria.difficulty === "" || q.difficulty === paperCriteria.difficulty)
    );
    const sortedQuestions = [...filtered].sort((a, b) => a.marks - b.marks);
    setGeneratedPaper(sortedQuestions.slice(0, paperCriteria.numberOfQuestions));
  }

  const filteredQuestions = questions.filter((q) =>
    (filters.difficulty === "" || q.difficulty === filters.difficulty) &&
    (filters.subject === "" ||
      q.subject.toLowerCase().includes(filters.subject.toLowerCase())) &&
    (filters.topic === "" ||
      q.topic.toLowerCase().includes(filters.topic.toLowerCase()))
  );

  function generatePDF() {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text(`${paperCriteria.subject} Question Paper`, 14, 22);

    const tableColumn = ["Question", "Marks"];
    const tableRows = [];

    const sortedQuestions = [...questions].sort((a, b) => a.marks - b.marks);

    sortedQuestions.forEach((q) => {
      const questionData = [
        q.question,
        q.marks.toString(),
      ];
      tableRows.push(questionData);
    });

    autoTable(doc,{
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      styles: {
        fontSize: 10,
        textColor: [0, 0, 0],
        fillColor: false
      },
      headStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
      }
    });

    doc.save(`${paperCriteria.subject}-questions.pdf`);
  }
  return (
    <div className="md:px-90 px-5 py-5 w-screen bg-slate-200 min-h-screen overflow-y-scroll">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-slate-700">Questions</h2>
        <div className="flex items-center gap-5">
          {isAdmin ? (
            <button
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg cursor-pointer text-sm"
              onClick={() => openModal("add")}
            >
              Add Question
            </button>
          ) : (
            <button
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg cursor-pointer text-sm"
              onClick={() => openModal("generate")}
            >
              Generate Question Paper
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-4 flex flex-wrap gap-4">
        <select
          className="border px-3 py-2 rounded"
          value={filters.difficulty}
          onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
        >
          <option value="">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

        <input
          className="border px-3 py-2 rounded"
          placeholder="Filter by Subject"
          value={filters.subject}
          onChange={(e) => setFilters({ ...filters, subject: e.target.value })}
        />

        <input
          className="border px-3 py-2 rounded"
          placeholder="Filter by Topic"
          value={filters.topic}
          onChange={(e) => setFilters({ ...filters, topic: e.target.value })}
        />

        <button
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded cursor-pointer text-sm"
          onClick={() => setFilters({ topic: "", difficulty: "", subject: "" ,marks:""})}
        >
          Clear Filters
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredQuestions.map((q) => (
          <div
            key={q.id}
            className="bg-white shadow rounded-lg p-4 border border-slate-100 flex items-center justify-between"
          >
            <div>
              <h3 className="text-slate-700 font-medium text-lg mr-4 mb-2">
                {q.question}
              </h3>
              <p className="text-sm text-slate-500 ">
                Difficulty: <span className={`font-medium ${q.difficulty === "Easy"
                  ? "text-green-500"
                  : q.difficulty === "Medium"
                    ? "text-yellow-500"
                    : "text-red-500"}`}>{q.difficulty}</span> | Subject: <span className="font-bold">{q.subject}</span> | Topic: <span className="font-bold">{q.topic}</span> | Marks: <span className="font-bold">{q.marks}</span>
              </p>
            </div>
            {isAdmin && (
              <div className="flex flex-col gap-2 mt-2">
                <button className="text-blue-500 hover:underline cursor-pointer" onClick={() => openModal("view", q)}>
                  <Eye size={20} />
                </button>
                <button className="text-green-500 hover:underline cursor-pointer" onClick={() => openModal("edit", q)}>
                  <Pencil size={20} />
                </button>
                <button className="text-red-500 hover:underline cursor-pointer" onClick={() => handleDelete(q.id)}>
                  <Trash2 size={20} />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalType && (
        <div className="fixed inset-0 bg-slate-200 bg-opacity-30 flex items-center justify-center z-50 overflow-y-scroll mt-4 mb-4">
          <div className="bg-white p-6 md:mx-0 mx-4 rounded-xl shadow-md w-full max-w-md">
            {modalType === "view" && (
              <>
                <h2 className="text-xl font-bold text-slate-700 mb-2">Question</h2>
                <p className="text-slate-700 mb-4 text-xl">{currentQuestion.question}</p>
                <p className="text-slate-600 mb-2 font-medium text-md">Difficulty: {currentQuestion.difficulty}</p>
                <p className="text-slate-600 mb-2 font-medium text-md">Subject: {currentQuestion.subject}</p>
                <p className="text-slate-600 mb-2 font-medium text-md">Topic: {currentQuestion.topic}</p>
                <p className="text-slate-600 font-medium text-md">Marks: {currentQuestion.marks}</p>
              </>
            )}

            {(modalType === "add" || modalType === "edit") && (
              <>
                <h2 className="text-xl font-bold text-slate-700 mb-4">{modalType === "add" ? "Add Question" : "Edit Question"}</h2>
                <input className="border rounded w-full mb-3 px-3 py-2 text-slate-700" placeholder="Enter Question" value={formData.question} onChange={(e) => setFormData({ ...formData, question: e.target.value })} />
                <select className="border rounded w-full mb-3 px-3 py-2 text-slate-700" value={formData.difficulty} onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
                <input className="border rounded w-full mb-3 px-3 py-2 text-slate-700" placeholder="Enter Subject" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} />
                <input className="border rounded w-full mb-4 px-3 py-2 text-slate-700" placeholder="Enter Topic" value={formData.topic} onChange={(e) => setFormData({ ...formData, topic: e.target.value })} />
                <input className="border rounded w-full mb-4 px-3 py-2 text-slate-700" placeholder="Enter Marks" value={formData.marks} onChange={(e) => setFormData({ ...formData, marks: e.target.value })} />
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded mr-2 cursor-pointer" onClick={modalType === "add" ? handleAdd : handleEdit}>{modalType === "add" ? "Add" : "Update"}</button>
              </>
            )}

            {modalType === "generate" && (
              <>
                <h2 className="text-xl font-bold text-slate-700 mb-4">Generate Question Paper</h2>
                <input className="border rounded w-full mb-3 px-3 py-2 text-slate-700" placeholder="Enter Subject" value={paperCriteria.subject} onChange={(e) => setPaperCriteria({ ...paperCriteria, subject: e.target.value })} />
                <select className="border rounded w-full mb-3 px-3 py-2 text-slate-700" value={paperCriteria.difficulty} onChange={(e) => setPaperCriteria({ ...paperCriteria, difficulty: e.target.value })}>
                  <option value="">All Difficulties</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
                <input type="number" min="1" className="border rounded w-full mb-4 px-3 py-2 text-slate-700" placeholder="Number of Questions" value={paperCriteria.numberOfQuestions} onChange={(e) => setPaperCriteria({ ...paperCriteria, numberOfQuestions: Number(e.target.value) })} />
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mr-2 cursor-pointer" onClick={generateQuestionPaper}>Generate</button>

                {generatedPaper.length > 0 && (
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold mb-2 text-slate-700">Generated Paper</h3>
                      <ArrowDownToLine size={20} color="green" onClick={() => generatePDF()}/>
                    </div>
                    <ul className="list-disc ml-5 text-slate-700">
                      {generatedPaper.map((q, index) => (
                        <li key={index} className="mb-2">
                          <p className="font-medium">{q.question}</p>

                          <p className="text-sm text-slate-500">
                            Difficulty: <span className={`${q.difficulty === "Easy"
                              ? "text-green-500"
                              : q.difficulty === "Medium"
                                ? "text-yellow-500"
                                : "text-red-500"}`}>{q.difficulty}</span>
                            {" | "}
                            Subject: <span className="font-semibold">{q.subject}</span>
                            {" | "}
                            Topic: <span className="font-semibold">{q.topic}</span>
                          </p>
                          <p className="text-sm">Marks : {q.marks}</p>

                        </li>

                      ))}
                    </ul>

                  </div>
                )}
              </>
            )}

            <button className="text-white mt-4 cursor-pointer bg-gray-500 px-4 rounded-md py-2" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}