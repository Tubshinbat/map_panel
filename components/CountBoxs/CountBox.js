import Link from "next/link";

const CountBox = ({ data }) => {
  if (!data) return null;
  if (data)
    return (
      <div className="col">
        <div className={"card " + data.boxStyle}>
          <div className={"card-body px-9 pb-4 " + data.styles}>
            <h4 className=" d-flex gap-1">{data.count}</h4>
            <h6 className="fw-normal fs-3 mb-1">{data.label}</h6>
            <Link href={data.link} className="btn btn-count text-nowrap">
              Бүгдийг нь харах
            </Link>
            <div className="icon">
              <i className={data.icon}></i>
            </div>
          </div>
        </div>
      </div>
    );
};

export default CountBox;
