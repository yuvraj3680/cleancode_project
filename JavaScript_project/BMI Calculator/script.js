const bmiForm = document.getElementById('bmiForm');
  const resultElement = document.getElementById('result');

  bmiForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);

    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
      resultElement.textContent = 'Please enter valid height and weight values.';
      return;
    }

    const bmi = calculateBMI(height, weight);
    const bmiCategory = getBMICategory(bmi);

    resultElement.textContent = `Your BMI: ${bmi.toFixed(1)} - ${bmiCategory}`;
  });

  function calculateBMI(height, weight) {
    return weight / ((height / 100) * (height / 100));
  }

  function getBMICategory(bmi) {
    if (bmi < 18.5) {
      return 'Underweight';
    } else if (bmi >= 18.5 && bmi < 25) {
      return 'Normal weight';
    } else if (bmi >= 25 && bmi < 30) {
      return 'Overweight';
    } else {
      return 'Obese';
    }
  }