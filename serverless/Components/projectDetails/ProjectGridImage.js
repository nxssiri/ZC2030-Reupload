const ProjectImageCard = (props) => {
  console.log(props.img);

  return (
    <div className="">
      <div className="rounded-xl hover:scale-105 transition duration-200 ease-in-out">
        <img
          alt={"project"}
          src={props.img}
          className="rounded-box shadow-sm object-cover h-60 w-60"
        />
      </div>
    </div>
  );
};

export default ProjectImageCard;
