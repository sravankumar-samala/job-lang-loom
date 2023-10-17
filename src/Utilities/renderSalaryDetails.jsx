export default function RenderSalaryDetails({ salaryMax, salaryMin }) {
  const formatSalary = (salary) => salary / 100000;
  const minSalary = salaryMin && formatSalary(salaryMin);
  const maxSalary = salaryMax && formatSalary(salaryMax);

  if (salaryMax && salaryMin) {
    if (salaryMax === salaryMin) {
      return <p>{`${minSalary}L`}</p>;
    }
    return <p>{`${minSalary}L - ${maxSalary}L`}</p>;
  } else if (salaryMin && !salaryMax) {
    return <p>{`${minSalary}L`}</p>;
  } else if (salaryMax && !salaryMin) {
    return <p>{`${maxSalary}L`}</p>;
  } else return <p>Not specified</p>;
}
