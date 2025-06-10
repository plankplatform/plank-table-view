const getRandomWidth = () => {
  const widths = ['w-1/2', 'w-2/3', 'w-3/4', 'w-5/6', 'w-[90%]'];
  return widths[Math.floor(Math.random() * widths.length)];
};

export default function LoadingCellRenderer() {
  const widthClass = getRandomWidth();

  return (
    <div className="flex items-center h-full">
      <div className={`animate-pulse bg-gray-300 h-4 ${widthClass} rounded`} />
    </div>
  );
}
