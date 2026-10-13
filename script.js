const form = document.getElementById("marksForm");
const marksInputs = Array.from(document.querySelectorAll(".mark"));
const resultSection = document.getElementById("result");
const errorMessage = document.getElementById("errorMessage");

function getGrade(percentage) {
  if (percentage >= 90) return "A+";
  if (percentage >= 80) return "A";
  if (percentage >= 70) return "B";
  if (percentage >= 60) return "C";
  if (percentage >= 35) return "D";
  return "F";
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  errorMessage.textContent = "";

  const marks = marksInputs.map((input) => input.value.trim());

  if (marks.some((mark) => mark === "")) {
    errorMessage.textContent = "Please enter marks for all five subjects.";
    resultSection.hidden = true;
    return;
  }

  const numericMarks = marks.map(Number);

  if (numericMarks.some((mark) => !Number.isFinite(mark) || mark < 0 || mark > 100)) {
    errorMessage.textContent = "Each subject mark must be between 0 and 100.";
    resultSection.hidden = true;
    return;
  }

  if (numericMarks.some((mark) => !Number.isInteger(mark))) {
    errorMessage.textContent = "Please enter whole-number marks only.";
    resultSection.hidden = true;
    return;
  }

  const total = numericMarks.reduce((sum, mark) => sum + mark, 0);
  const percentage = total / 5;
  const passed = numericMarks.every((mark) => mark >= 35);
  const studentName = document.getElementById("studentName").value.trim();

  document.getElementById("greeting").textContent =
    studentName ? `Well done, ${studentName}! Here are your marks.` : "Here are your marks.";
  document.getElementById("total").textContent = `${total} / 500`;
  document.getElementById("percentage").textContent = `${percentage.toFixed(2)}%`;
  document.getElementById("grade").textContent = getGrade(percentage);

  const status = document.getElementById("status");
  status.textContent = passed
    ? "Result: PASS — you scored at least 35 in every subject."
    : "Result: FAIL — you need at least 35 in every subject to pass.";
  status.className = `status ${passed ? "pass" : "fail"}`;

  resultSection.hidden = false;
  resultSection.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

form.addEventListener("reset", function () {
  errorMessage.textContent = "";
  resultSection.hidden = true;
});
