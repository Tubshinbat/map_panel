import CountBoxs from "components/CountBoxs/Countboxs";

const Page = () => {
  return (
    <>
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Хянах самбар</h1>
            </div>
          </div>
        </div>
      </section>
      <section className="content">
        <div className="container-fluid">
          <CountBoxs />
        </div>
      </section>
    </>
  );
};

export default Page;
