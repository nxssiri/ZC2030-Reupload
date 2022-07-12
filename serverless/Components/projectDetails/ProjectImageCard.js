const ProjectImageCard = (props) => {
  console.log(props.img);

  return (
    <div className="">
      <div className="">
        <img
          alt={"project"}
          src={props.img}
          className="rounded-xl shadow-sm object-cover h-60 w-60
                 "
        />
      </div>
    </div>
  );
};

export default ProjectImageCard;
