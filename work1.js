/*נועה כהן_209265974 אור אוחיון 213252802*/

const fromButtons = document.querySelectorAll('#container1 .base-buttons button');
const toButtons = document.querySelectorAll('#container2 .base-buttons-result button');
const inputField = document.getElementById('number-input');
const resultText = document.querySelector('.result-text');
const form = document.getElementById('converter');

let fromBase = null;
let toBase = null;

// פונקציה שמדגישה כפתור שנבחר ומגדילה אותו, ומסירה את ההדגשה מהשאר
function highlightSelected(allButtons, selectedBtn) {
    allButtons.forEach(btn => {
        btn.classList.remove("chosen"); // מסיר את ההדגשה מהכפתור
        btn.style.transform = "scale(1)"; // מחזיר את גודל הכפתור לברירת מחדל
    });
    selectedBtn.classList.add("chosen"); // מוסיף הדגשה לכפתור שנבחר
    selectedBtn.style.transform = "scale(1.1)"; // מגדיל את הכפתור שנבחר
}

// מאזין לכפתורי בחירת בסיס המוצא
fromButtons.forEach(button => {
    button.addEventListener('click', () => {
        fromBase = parseInt(button.dataset.base); // שומר את הבסיס שנבחר
        highlightSelected(fromButtons, button); // מדגיש את הכפתור שנבחר
        resultText.innerHTML = `<strong>Result:</strong>`; // מאפס את התוצאה
    });
});

//  מאזין לכפתורי בחירת בסיס היעד
toButtons.forEach(button => {
    button.addEventListener('click', () => {
        toBase = parseInt(button.dataset.base); // שומר את הבסיס שנבחר
        highlightSelected(toButtons, button); // מדגיש את הכפתור שנבחר
        resultText.innerHTML = `<strong>Result:</strong>`; // מאפס את התוצאה
    });
});

// מאזין לאירוע submit של הטופס (למעשה הכפתור של ההמרה)
form.addEventListener("submit", (e) => {
    e.preventDefault(); // מונע מהדף להתרענן אחרי שלחצנו על כפתור המרה

    const inputValue = inputField.value; // שומר את הערך שהוזן בשדה הקלט

    //  אם נבחרו שני בסיסים והוזן ערך
    if (fromBase !== null && toBase !== null && inputValue !== "") {
        const decimal = parseInt(inputValue, fromBase); // המרה לבסיס עשרוני
        const converted = decimal.toString(toBase).toUpperCase(); // המרה לבסיס היעד
        resultText.innerHTML = `<strong>Result:</strong> ${inputValue} (${fromBase}) => ${converted} (${toBase})`; // הצגת התוצאה
    } else {
        resultText.innerHTML = `<strong>Result:</strong> Please select both bases and enter a number.`; // הודעה אם לא נבחרו בסיסים או לא הוזן ערך
    }

    // בדיקה אם הקלט מתאים לבסיס שנבחר
    const validChars = {
        2: /^[01]+$/i, // חוקיות עבור בסיס 2
        8: /^[0-7]+$/i, // חוקיות עבור בסיס 8
        10: /^[0-9]+$/i, // חוקיות עבור בסיס 10
        16: /^[0-9a-f]+$/i // חוקיות עבור בסיס 16
    };

    const regex = validChars[fromBase]; //  בהתאם לבסיס נבחר את התבנית המתאימה
    if (!regex.test(inputValue)) {
        alert(`The input "${inputValue}" is not valid for base ${fromBase}.`); // הודעה במקרה של קלט לא חוקי
        resultText.innerHTML = `<strong>Result:</strong>`; // מאפס את התוצאה
        return; // עוצר את הפונקציה
    }

    // מאפס את הסימונים וההגדלות של כל הכפתורים
    [...fromButtons, ...toButtons].forEach(btn => {
        btn.classList.remove("chosen");
        btn.style.transform = "scale(1)"; // מחזיר את הגודל לברירת מחדל
    });

    // מאפס את שדה הקלט
    inputField.value = "";

    //מאפס את הבחירה בזיכרון
    fromBase = null;
    toBase = null;
});