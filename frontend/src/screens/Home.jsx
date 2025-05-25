import { useEffect, useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import axios from "axios";

export default function Home() {
  const [isAdmin, setIsAdmin] = useState(
    window.localStorage.getItem("isAdmin") === "true"
  );
  const [username, setUsername] = useState(
    window.localStorage.getItem("username") ?? ""
  );
  const [questions, setQuestions] = useState([]);
  const [modalType, setModalType] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [formData, setFormData] = useState({
    questionText: "",
    difficultyLevel: "easy",
    subject: "",
    topic: "",
    marks: "",
  });
  const [filters, setFilters] = useState({
    topic: "",
    difficultyLevel: "",
    subject: "",
  });
  const [paperCriteria, setPaperCriteria] = useState({
    subject: "",
    difficultyLevel: "",
    numberOfQuestions: 5,
  });

  const [generatedPaperFormData,setGeneratedPaperFormData] = useState({
    generatedBy: username,
    generatedDate: new Date(),
    totalMarks: 0
  });

  const [generatedPaper, setGeneratedPaper] = useState([]);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/questions/getAllQuestions"
        );
        setQuestions(response.data);
      } catch (e) {
        console.error(e);
      }
    }
    fetchQuestions();
  }, []);

  function openModal(type, question = null) {
    setModalType(type);
    setCurrentQuestion(question);
    if (type === "edit" || type === "add") {
      setFormData(
        question
          ? { ...question }
          : {
            questionText: "",
            difficultyLevel: "easy",
            subject: "",
            topic: "",
            marks: "",
          }
      );
    }
  }

  function closeModal() {
    setModalType(null);
    setCurrentQuestion(null);
    setFormData({
      questionText: "",
      difficultyLevel: "easy",
      subject: "",
      topic: "",
      marks: "",
    });
    setGeneratedPaper([]);
  }

  async function handleAdd() {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/questions/save",
        {
          questionText: formData.questionText,
          subject: formData.subject,
          topic: formData.topic,
          difficultyLevel: formData.difficultyLevel,
          marks: formData.marks,
        }
      );
      setQuestions([...questions, response.data]);
      closeModal();
    } catch (e) {
      console.error(e);
      closeModal();
    }
  }

  async function handleEdit() {
    try {
      await axios.put(
        `http://localhost:8080/api/v1/questions/updateQuestion`,
        formData
      );
      setQuestions(
        questions.map((q) =>
          q.id === currentQuestion.id ? { ...q, ...formData } : q
        )
      );
      closeModal();
    } catch (e) {
      console.error(e);
    }
  }

  async function handleDelete(id) {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/questions/deleteQuestion/${id}`
      );
      console.log(response)
      setQuestions(questions.filter((q) => q.id !== id));
    } catch (e) {
      console.error(e);
    }
  }

  async function saveGeneratedRecord(){
    generatedPaperFormData.totalMarks = generatedPaper.reduce((acc,curr) => acc + curr.marks,0);
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/generatedPapers/save`,
        generatedPaperFormData
      );
      console.log(response);
      closeModal();
    } catch (e) {
      console.error(e);
    }
  }

  function generateQuestionPaper() {
    const filtered = questions.filter(
      (q) =>
        (paperCriteria.subject === "" ||
          q.subject.toLowerCase() === paperCriteria.subject.toLowerCase()) &&
        (paperCriteria.difficultyLevel === "" ||
          q.difficultyLevel === paperCriteria.difficultyLevel)
    );
    const sortedQuestions = [...filtered].sort((a, b) => a.marks - b.marks);
    setGeneratedPaper(sortedQuestions.slice(0, paperCriteria.numberOfQuestions));
  }

  const filteredQuestions = questions.filter(
    (q) =>
      (filters.difficultyLevel === "" ||
        q.difficultyLevel === filters.difficultyLevel) &&
      (filters.subject === "" ||
        q.subject.toLowerCase().includes(filters.subject.toLowerCase())) &&
      (filters.topic === "" ||
        q.topic.toLowerCase().includes(filters.topic.toLowerCase()))
  );

  function generatePDF() {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text(`${paperCriteria.subject || "Generated"} Question Paper`, 14, 22);

    const tableColumn = ["Question", "Marks"];
    const tableRows = [];

    generatedPaper.forEach((q) => {
      tableRows.push([q.questionText, q.marks.toString()]);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      styles: {
        fontSize: 10,
        textColor: [0, 0, 0],
      },
      headStyles: {
        fillColor: [230, 230, 230],
        textColor: [0, 0, 0],
      },
    });

    doc.save(`${paperCriteria.subject || "question"}-paper.pdf`);
    saveGeneratedRecord();
  }

  return (
    <div className="px-5 md:px-90 py-5 w-screen bg-slate-200 min-h-screen overflow-y-scroll">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-slate-700">Questions</h2>
        {isAdmin ? (
          <button
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm"
            onClick={() => openModal("add")}
          >
            Add Question
          </button>
        ) : (
          <button
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm"
            onClick={() => {
              generateQuestionPaper();
              openModal("viewGenerated");
            }}
          >
            Generate Question Paper
          </button>
        )}
      </div>

      <div className="bg-white p-4 rounded-lg shadow mb-4 flex flex-wrap gap-4">
        <select
          className="border px-3 py-2 rounded"
          value={filters.difficultyLevel}
          onChange={(e) =>
            setFilters({ ...filters, difficultyLevel: e.target.value })
          }
        >
          <option value="">All Difficulties</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <input
          className="border px-3 py-2 rounded"
          placeholder="Filter by Subject"
          value={filters.subject}
          onChange={(e) =>
            setFilters({ ...filters, subject: e.target.value })
          }
        />

        <input
          className="border px-3 py-2 rounded"
          placeholder="Filter by Topic"
          value={filters.topic}
          onChange={(e) => setFilters({ ...filters, topic: e.target.value })}
        />

        <button
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded text-sm"
          onClick={() =>
            setFilters({ topic: "", difficultyLevel: "", subject: "" })
          }
        >
          Clear Filters
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredQuestions.map((q) => (
          <div
            key={q.id}
            className="bg-white shadow rounded-lg p-4 border flex justify-between"
          >
            <div>
              <h3 className="text-slate-700 font-medium text-lg mb-2 mr-5">
                {q.questionText}
              </h3>
              <p className="text-sm text-slate-500">
                Difficulty:{" "}
                <span
                  className={`font-medium ${(q?.difficultyLevel).toUpperCase() === "EASY"
                    ? "text-green-500"
                    : (q?.difficultyLevel).toUpperCase() === "MEDIUM"
                      ? "text-yellow-500"
                      : "text-red-500"
                    }`}
                >
                  {q.difficultyLevel}
                </span>{" "}
                | Subject: <b>{q.subject}</b> | Topic: <b>{q.topic}</b> | Marks:{" "}
                <b>{q.marks}</b>
              </p>
            </div>
            {isAdmin && (
              <div className="flex flex-col gap-2 mt-2">
                <button onClick={() => openModal("view", q)}>
                  <Eye size={20} color="#3b82f6" />
                </button>
                <button onClick={() => openModal("edit", q)}>
                  <Pencil size={20} color="green" />
                </button>
                <button onClick={() => handleDelete(q.id)}>
                  <Trash2 size={20} color="red" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {modalType && (
        <div className="fixed inset-0 bg-slate-500 bg-opacity-30 flex items-center justify-center z-50 px-5 text-center">
          <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
            {modalType === "view" && (
              <>
                <h2 className="text-xl font-bold mb-4">Question</h2>
                <p className="font-medium text-gray-700 text-xl mb-10">{currentQuestion.questionText}</p>
                <p>Difficulty: <span className="font-medium">{currentQuestion.difficultyLevel}</span></p>
                <p>Subject: <span className="font-medium">{currentQuestion.subject}</span></p>
                <p>Topic: <span className="font-medium">{currentQuestion.topic}</span></p>
                <p>Marks: <span className="font-medium">{currentQuestion.marks}</span></p>
                <button
                  onClick={closeModal}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded text-sm mt-4"
                >Close</button>
              </>
            )}

            {(modalType === "add" || modalType === "edit") && (
              <>
                <h2 className="text-xl font-bold mb-4">
                  {modalType === "add" ? "Add Question" : "Edit Question"}
                </h2>
                <input
                  className="border rounded w-full mb-3 px-3 py-2"
                  placeholder="Enter Question"
                  value={formData.questionText}
                  onChange={(e) =>
                    setFormData({ ...formData, questionText: e.target.value })
                  }
                />
                <select
                  className="border rounded w-full mb-3 px-3 py-2"
                  value={formData.difficultyLevel}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      difficultyLevel: e.target.value,
                    })
                  }
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
                <input
                  className="border rounded w-full mb-3 px-3 py-2"
                  placeholder="Enter Subject"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                />
                <input
                  className="border rounded w-full mb-3 px-3 py-2"
                  placeholder="Enter Topic"
                  value={formData.topic}
                  onChange={(e) =>
                    setFormData({ ...formData, topic: e.target.value })
                  }
                />
                <input
                  type="number"
                  className="border rounded w-full mb-3 px-3 py-2"
                  placeholder="Enter Marks"
                  value={formData.marks}
                  onChange={(e) =>
                    setFormData({ ...formData, marks: e.target.value })
                  }
                />
                <div className="flex justify-end gap-2">
                  <button
                    className="bg-gray-300 px-4 py-2 rounded"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                    onClick={modalType === "add" ? handleAdd : handleEdit}
                  >
                    {modalType === "add" ? "Add" : "Save"}
                  </button>
                </div>
              </>
            )}

            {modalType === "viewGenerated" && (
              <>
                <h2 className="text-xl font-bold mb-4">Generated Paper</h2>
                <select
                  className="border rounded w-full mb-3 px-3 py-2"
                  value={paperCriteria.difficultyLevel}
                  onChange={(e) =>
                    setPaperCriteria({ ...paperCriteria, difficultyLevel: e.target.value })
                  }
                >
                  <option value="">All Difficulties</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
                <input
                  className="border rounded w-full mb-3 px-3 py-2"
                  placeholder="Enter Subject"
                  value={paperCriteria.subject}
                  onChange={(e) =>
                    setPaperCriteria({ ...paperCriteria, subject: e.target.value })
                  }
                />
                <input
                  type="number"
                  className="border rounded w-full mb-3 px-3 py-2"
                  placeholder="Number of Questions"
                  value={paperCriteria.numberOfQuestions}
                  onChange={(e) =>
                    setPaperCriteria({
                      ...paperCriteria,
                      numberOfQuestions: parseInt(e.target.value),
                    })
                  }
                />
                <ul className="list-disc pl-4 mb-4 text-left">
                  {generatedPaper.map((q, idx) => (
                    <li key={idx}>
                      <span className="font-medium">{q.questionText}</span> <br /> <span className="text-right">{q.marks}</span> Marks
                    </li>
                  ))}
                </ul>
                <div className="flex gap-5 flex-col-reverse">
                  <button
                    className="bg-green-600 text-white px-4 py-2 rounded"
                    onClick={generatePDF}
                  >
                    Download PDF
                  </button>
                  <button
                    className="bg-green-600 text-white px-4 py-2 rounded"
                    onClick={generateQuestionPaper}
                  >
                    Create Questions
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
