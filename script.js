let selectedGoal = "maintain";

function setGoal(goal) {
  selectedGoal = goal;

  // remove active state
  document.querySelectorAll(".goal-buttons button").forEach(btn => {
    btn.classList.remove("active");
  });

  // highlight selected
  document.getElementById(goal + "Btn").classList.add("active");

  calculateBMI(); // auto update
}

function showToast(message, type) {
	let toast = document.getElementById("toast");
	let toastMsg = document.getElementById("toastMessage");
	let toastIcon = document.getElementById("toastIcon");

	toastMsg.innerText = message;

	
	if (type === "underweight") {
		toast.style.background = "linear-gradient(135deg, #aeb06a, #f8fc72)";
		toastIcon.innerText = "🍿";
	}
	else if (type === "normal") {
		toast.style.background = "linear-gradient(135deg, #00c9a7, #92fe9d)";
		toastIcon.innerText = "❤️";
	}
	else if (type === "overweight") {
		toast.style.background = "linear-gradient(135deg, #e06060, #e63232)";
		toastIcon.innerText = "👀";
	}
	else if (type === "obese") {
		toast.style.background = "linear-gradient(135deg, #6693fa, #3440c2)";
		toastIcon.innerText = "⚠️";
	}

	// reset animation
	toast.classList.remove("show");
	void toast.offsetWidth;

	toast.classList.add("show");

	setTimeout(() => {
		toast.classList.remove("show");
	}, 2500);
}

function calculateBMI() {
	let height = document.getElementById("height").value / 100;
	let weight = document.getElementById("weight").value;

	// validation
	if (!height || !weight) {
		alert("Please enter height and weight!");
		return;
	}

	let bmi = weight / (height * height);
	bmi = bmi.toFixed(1);

	let category = "";
	let plan = "";
	let motivation = "";

	let progressBar = document.getElementById("progress");

	// BMI categories + color
	if (bmi < 18.5) {
		category = "Underweight";
		plan = "Increase calories and focus on strength training. Focus on calorie deficit.";
		motivation = "You got this 🍎🫡 Small progress is still progress.";
		progressBar.style.background = "#ffc107";
	} 
	else if (bmi < 24.9) {
		category = "Normal";
		plan = "Great job! Maintain with balanced workouts.";
		motivation = "You're doing amazing 🏆✨ Keep it up!";
		progressBar.style.background = "#7cd988";
	} 
	else if (bmi < 29.9) {
		category = "Overweight";
		plan = "Add cardio and reduce calorie intake. Increase protein and lift weights.";
		motivation = "Stay consistent 💪🥬 Results will come!";
		progressBar.style.background = "#f53a27";
	} 
	else {
		category = "Obese";
		plan = "Start light workouts and control diet.";
		motivation = "Fall in love with taking care of yourself 🫶";
		progressBar.style.background = "#ff4d4d";
	}

	// progress bar
	let percentage = Math.min((bmi / 40) * 100, 100);
	progressBar.style.width = percentage + "%";

	// display result
	document.getElementById("result").innerText = `BMI: ${bmi} (${category})`;
	document.getElementById("plan").innerText = plan;

	showToast(motivation, category.toLowerCase());

	// animation
	let card = document.getElementById("resultCard");
	card.classList.remove("show");
	void card.offsetWidth;
	card.classList.add("show");
}
