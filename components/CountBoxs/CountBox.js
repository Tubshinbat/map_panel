import Link from "next/link";

const CountBox = ({ data }) => {
  console.log(data);
  if (!data) return null;
  if (data)
    return (
      <div className="col">
        <div className={"card " + data.boxStyle}>
          <div className="card-body text-center px-9 pb-4">
            <div
              className={`d-flex align-items-center justify-content-center round-48 rounded count-box-icon flex-shrink-0 mb-3 mx-auto ${" "} ${
                data.styles
              }`}
            >
              <iconify-icon icon={data.icon} className="fs-7 text-white" />
            </div>
            <h6 className="fw-normal fs-3 mb-1">{data.label}</h6>
            <h4 className="mb-3 d-flex align-items-center justify-content-center gap-1">
              {data.count}
            </h4>
            <Link
              href={data.link}
              className="btn btn-white fs-2 fw-semibold text-nowrap"
            >
              Бүгдийг нь харах
            </Link>
          </div>
        </div>
      </div>
    );
};

export default CountBox;
