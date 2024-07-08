import CountBoxs from "components/CountBoxs/Countboxs";
import Header from "components/Header/Header";
import Side from "components/Side/Side";

const Page = () => {
  return (
    <>
      <div className="page-wrapper">
        <Side />
        {/*  Header Start */}
        <Header />
        {/*  Header End */}

        <div className="body-wrapper">
          <div className="container-fluid">
            <div className="row">
              <CountBoxs />
            </div>
          </div>
        </div>

        <div
          className="offcanvas customizer offcanvas-end"
          tabIndex={-1}
          id="offcanvasExample"
          aria-labelledby="offcanvasExampleLabel"
        >
          <div className="d-flex align-items-center justify-content-between p-3 border-bottom">
            <h4
              className="offcanvas-title fw-semibold"
              id="offcanvasExampleLabel"
            >
              Settings
            </h4>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            />
          </div>
          <div
            className="offcanvas-body"
            data-simplebar
            style={{ height: "calc(100vh - 80px)" }}
          >
            <h6 className="fw-semibold fs-4 mb-2">Theme</h6>
            <div className="d-flex flex-row gap-3 customizer-box" role="group">
              <input
                type="radio"
                className="btn-check light-layout"
                name="theme-layout"
                id="light-layout"
                autoComplete="off"
              />
              <label
                className="btn p-9 btn-outline-primary rounded-2"
                htmlFor="light-layout"
              >
                <i className="icon ti ti-brightness-up fs-7 me-2" />
                Light
              </label>
              <input
                type="radio"
                className="btn-check dark-layout"
                name="theme-layout"
                id="dark-layout"
                autoComplete="off"
              />
              <label
                className="btn p-9 btn-outline-primary rounded-2"
                htmlFor="dark-layout"
              >
                <i className="icon ti ti-moon fs-7 me-2" />
                Dark
              </label>
            </div>
            <h6 className="mt-5 fw-semibold fs-4 mb-2">Theme Direction</h6>
            <div className="d-flex flex-row gap-3 customizer-box" role="group">
              <input
                type="radio"
                className="btn-check"
                name="direction-l"
                id="ltr-layout"
                autoComplete="off"
              />
              <label
                className="btn p-9 btn-outline-primary rounded-2"
                htmlFor="ltr-layout"
              >
                <i className="icon ti ti-text-direction-ltr fs-7 me-2" />
                LTR
              </label>
              <input
                type="radio"
                className="btn-check"
                name="direction-l"
                id="rtl-layout"
                autoComplete="off"
              />
              <label
                className="btn p-9 btn-outline-primary rounded-2"
                htmlFor="rtl-layout"
              >
                <i className="icon ti ti-text-direction-rtl fs-7 me-2" />
                RTL
              </label>
            </div>
            <h6 className="mt-5 fw-semibold fs-4 mb-2">Theme Colors</h6>
            <div
              className="d-flex flex-row flex-wrap gap-3 customizer-box color-pallete"
              role="group"
            >
              <input
                type="radio"
                className="btn-check"
                name="color-theme-layout"
                id="Blue_Theme"
                autoComplete="off"
              />
              <label
                className="btn p-9 btn-outline-primary rounded-2 d-flex align-items-center justify-content-center"
                onclick="handleColorTheme('Blue_Theme')"
                htmlFor="Blue_Theme"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-title="BLUE_THEME"
              >
                <div className="color-box rounded-circle d-flex align-items-center justify-content-center skin-1">
                  <i className="ti ti-check text-white d-flex icon fs-5" />
                </div>
              </label>
              <input
                type="radio"
                className="btn-check"
                name="color-theme-layout"
                id="Aqua_Theme"
                autoComplete="off"
              />
              <label
                className="btn p-9 btn-outline-primary rounded-2 d-flex align-items-center justify-content-center"
                onclick="handleColorTheme('Aqua_Theme')"
                htmlFor="Aqua_Theme"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-title="AQUA_THEME"
              >
                <div className="color-box rounded-circle d-flex align-items-center justify-content-center skin-2">
                  <i className="ti ti-check text-white d-flex icon fs-5" />
                </div>
              </label>
              <input
                type="radio"
                className="btn-check"
                name="color-theme-layout"
                id="Purple_Theme"
                autoComplete="off"
              />
              <label
                className="btn p-9 btn-outline-primary rounded-2 d-flex align-items-center justify-content-center"
                onclick="handleColorTheme('Purple_Theme')"
                htmlFor="Purple_Theme"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-title="PURPLE_THEME"
              >
                <div className="color-box rounded-circle d-flex align-items-center justify-content-center skin-3">
                  <i className="ti ti-check text-white d-flex icon fs-5" />
                </div>
              </label>
              <input
                type="radio"
                className="btn-check"
                name="color-theme-layout"
                id="green-theme-layout"
                autoComplete="off"
              />
              <label
                className="btn p-9 btn-outline-primary rounded-2 d-flex align-items-center justify-content-center"
                onclick="handleColorTheme('Green_Theme')"
                htmlFor="green-theme-layout"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-title="GREEN_THEME"
              >
                <div className="color-box rounded-circle d-flex align-items-center justify-content-center skin-4">
                  <i className="ti ti-check text-white d-flex icon fs-5" />
                </div>
              </label>
              <input
                type="radio"
                className="btn-check"
                name="color-theme-layout"
                id="cyan-theme-layout"
                autoComplete="off"
              />
              <label
                className="btn p-9 btn-outline-primary rounded-2 d-flex align-items-center justify-content-center"
                onclick="handleColorTheme('Cyan_Theme')"
                htmlFor="cyan-theme-layout"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-title="CYAN_THEME"
              >
                <div className="color-box rounded-circle d-flex align-items-center justify-content-center skin-5">
                  <i className="ti ti-check text-white d-flex icon fs-5" />
                </div>
              </label>
              <input
                type="radio"
                className="btn-check"
                name="color-theme-layout"
                id="orange-theme-layout"
                autoComplete="off"
              />
              <label
                className="btn p-9 btn-outline-primary rounded-2 d-flex align-items-center justify-content-center"
                onclick="handleColorTheme('Orange_Theme')"
                htmlFor="orange-theme-layout"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-title="ORANGE_THEME"
              >
                <div className="color-box rounded-circle d-flex align-items-center justify-content-center skin-6">
                  <i className="ti ti-check text-white d-flex icon fs-5" />
                </div>
              </label>
            </div>
            <h6 className="mt-5 fw-semibold fs-4 mb-2">Layout Type</h6>
            <div className="d-flex flex-row gap-3 customizer-box" role="group">
              <div>
                <input
                  type="radio"
                  className="btn-check"
                  name="page-layout"
                  id="vertical-layout"
                  autoComplete="off"
                />
                <label
                  className="btn p-9 btn-outline-primary rounded-2"
                  htmlFor="vertical-layout"
                >
                  <i className="icon ti ti-layout-sidebar-right fs-7 me-2" />
                  Vertical
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  className="btn-check"
                  name="page-layout"
                  id="horizontal-layout"
                  autoComplete="off"
                />
                <label
                  className="btn p-9 btn-outline-primary rounded-2"
                  htmlFor="horizontal-layout"
                >
                  <i className="icon ti ti-layout-navbar fs-7 me-2" />
                  Horizontal
                </label>
              </div>
            </div>
            <h6 className="mt-5 fw-semibold fs-4 mb-2">Container Option</h6>
            <div className="d-flex flex-row gap-3 customizer-box" role="group">
              <input
                type="radio"
                className="btn-check"
                name="layout"
                id="boxed-layout"
                autoComplete="off"
              />
              <label
                className="btn p-9 btn-outline-primary rounded-2"
                htmlFor="boxed-layout"
              >
                <i className="icon ti ti-layout-distribute-vertical fs-7 me-2" />
                Boxed
              </label>
              <input
                type="radio"
                className="btn-check"
                name="layout"
                id="full-layout"
                autoComplete="off"
              />
              <label
                className="btn p-9 btn-outline-primary rounded-2"
                htmlFor="full-layout"
              >
                <i className="icon ti ti-layout-distribute-horizontal fs-7 me-2" />
                Full
              </label>
            </div>
            <h6 className="fw-semibold fs-4 mb-2 mt-5">Sidebar Type</h6>
            <div className="d-flex flex-row gap-3 customizer-box" role="group">
              <a href="javascript:void(0)" className="fullsidebar">
                <input
                  type="radio"
                  className="btn-check"
                  name="sidebar-type"
                  id="full-sidebar"
                  autoComplete="off"
                />
                <label
                  className="btn p-9 btn-outline-primary rounded-2"
                  htmlFor="full-sidebar"
                >
                  <i className="icon ti ti-layout-sidebar-right fs-7 me-2" />
                  Full
                </label>
              </a>
              <div>
                <input
                  type="radio"
                  className="btn-check"
                  name="sidebar-type"
                  id="mini-sidebar"
                  autoComplete="off"
                />
                <label
                  className="btn p-9 btn-outline-primary rounded-2"
                  htmlFor="mini-sidebar"
                >
                  <i className="icon ti ti-layout-sidebar fs-7 me-2" />
                  Collapse
                </label>
              </div>
            </div>
            <h6 className="mt-5 fw-semibold fs-4 mb-2">Card With</h6>
            <div className="d-flex flex-row gap-3 customizer-box" role="group">
              <input
                type="radio"
                className="btn-check"
                name="card-layout"
                id="card-with-border"
                autoComplete="off"
              />
              <label
                className="btn p-9 btn-outline-primary rounded-2"
                htmlFor="card-with-border"
              >
                <i className="icon ti ti-border-outer fs-7 me-2" />
                Border
              </label>
              <input
                type="radio"
                className="btn-check"
                name="card-layout"
                id="card-without-border"
                autoComplete="off"
              />
              <label
                className="btn p-9 btn-outline-primary rounded-2"
                htmlFor="card-without-border"
              >
                <i className="icon ti ti-border-none fs-7 me-2" />
                Shadow
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
