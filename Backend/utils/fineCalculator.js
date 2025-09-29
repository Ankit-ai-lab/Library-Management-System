// Calculate fine for overdue books
// Assume fineRate = 0.25 per day
const fineCalculator = (dueDate, returnDate) => {
  const fineRate = 0.25;
  const due = new Date(dueDate);
  const returned = new Date(returnDate);

  const diffTime = returned - due; // in milliseconds
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // convert to days

  return diffDays > 0 ? diffDays * fineRate : 0;
};

module.exports = fineCalculator;
