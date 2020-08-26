export default function(
  arr,
  backgroundColor = ["red", "blue", "green"],
  label = "Процент"
) {
  const labels = [];
  const data = [];

  arr.forEach(({ name, percent }) => {
    labels.push(name);
    data.push(percent);
  });

  return {
    labels,
    datasets: [
      {
        label,
        backgroundColor,
        data
      }
    ]
  };
}
