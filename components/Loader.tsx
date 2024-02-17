const Loader = () => {
  return (
    <div className="flex space-x-2 w-full h-screen fixed inset-0 bg-card z-50 justify-center items-center">
      <div className=" flex justify-center items-center h-screen">
        <div className="loader"></div>
      </div>
    </div>
  );
};

export default Loader;
