document.addEventListener("DOMContentLoaded", function () {
    const calculateButton = document.getElementById("calculate-button");
    const subjectMarksInputs = document.querySelectorAll(".subject-marks");
    const subjectGradeSpans = document.querySelectorAll(".subject-grade");
    const totalMarksSpan = document.getElementById("total-marks");
    const meanMarksSpan = document.getElementById("mean-marks");
    const averageGradeSpan = document.getElementById("average-grade");
    const statusSpan = document.getElementById("status");
    const coursesContainer = document.getElementById("courses");
  
    const availableCourses = document.getElementById("courses")
  
    calculateButton.addEventListener("click", function () {
      let totalMarks = 0;
      let sumMarks = 0;
  
      subjectMarksInputs.forEach((input, index) => {
        const marks = parseInt(input.value);
        totalMarks += marks;
        sumMarks += marks * (index >= 5 ? 2 : 1); // Double weight for Chemistry, Biology, and Physics
        const grade = getGrade(marks);
        subjectGradeSpans[index].textContent = grade;
      });
  
      totalMarksSpan.textContent = totalMarks;
      const meanMarks = totalMarks / subjectMarksInputs.length;
      meanMarksSpan.textContent = meanMarks.toFixed(2);
  
      const averageGrade = getGrade(meanMarks);
      averageGradeSpan.textContent = averageGrade;
  
      if (averageGrade === "D" || averageGrade === "E") {
        statusSpan.textContent = "Opt for a technical course";
        coursesContainer.classList.add("hidden");
      } else if ((averageGrade === "C", "B", "A")) {
        statusSpan.textContent = "Qualified for college";
        coursesContainer.classList.remove("hidden");
      }
    });
  
    function getGrade(marks) {
      if (marks >= 80) return "A";
      if (marks >= 61) return "B";
      if (marks >= 51) return "C";
      if (marks >= 41) return "D";
      return "E";
    }
  
    fetch("http://localhost:3000/courses")
      .then((resp) => resp.json())
      .then(renderCourses);
  
    function renderCourses(courses) {
      console.log(courses);
  
      courses.forEach((course) => {
        const courseCardDiv = document.createElement("div");
        courseCardDiv.classList.add("course-box");
  
        const posterImage = document.createElement("img");
        posterImage.src = course.poster_image;
        posterImage.classList.add("poster-image");
  
        const courseTitle = document.createElement("h2");
        courseTitle.innerText = course.title;
        courseTitle.classList.add("course-title");
  
        const courseFaculty = document.createElement("h3");
        courseFaculty.innerText = course.faculty;
        courseFaculty.classList.add("course-faculty");
  
        const courseDuration = document.createElement("span");
        courseDuration.classList.add("course-duration");
        courseDuration.innerText = course.duration
  
        const courseDescription = document.createElement("p");
        courseDescription.classList.add("course-description");
        courseDescription.innerText = course.course_description;
  
        courseCardDiv.append(
          posterImage,
          courseTitle,
          courseFaculty,
          courseDuration,
          courseDescription
        );
  
        availableCourses.appendChild(courseCardDiv)
  
  
  
  
      });
    }
  });

