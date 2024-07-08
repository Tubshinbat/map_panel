const Header = () => {
  return (
    <header className="topbar">
      <div className="with-vertical">
        {/* ---------------------------------- */}
        {/* Start Vertical Layout Header */}
        {/* ---------------------------------- */}
        <nav className="navbar navbar-expand-lg p-0">
          <ul className="navbar-nav">
            <li className="nav-item d-flex d-xl-none">
              <a
                className="nav-link nav-icon-hover-bg rounded-circle  sidebartoggler "
                id="headerCollapse"
                href="javascript:void(0)"
              >
                <iconify-icon
                  icon="solar:hamburger-menu-line-duotone"
                  className="fs-6"
                />
              </a>
            </li>
            <li className="nav-item d-none d-xl-flex nav-icon-hover-bg rounded-circle">
              <a
                className="nav-link"
                href="javascript:void(0)"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                <iconify-icon icon="solar:magnifer-linear" className="fs-6" />
              </a>
            </li>
            <li className="nav-item d-none d-lg-flex dropdown nav-icon-hover-bg rounded-circle">
              <div className="hover-dd">
                <a
                  className="nav-link"
                  id="drop2"
                  href="javascript:void(0)"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <iconify-icon
                    icon="solar:widget-3-line-duotone"
                    className="fs-6"
                  />
                </a>
                <div
                  className="dropdown-menu dropdown-menu-nav dropdown-menu-animate-up py-0 overflow-hidden"
                  aria-labelledby="drop2"
                >
                  <div className="position-relative">
                    <div className="row">
                      <div className="col-md-8">
                        <div className="p-4 pb-3">
                          <div className="row">
                            <div className="col-md-6">
                              <div className="position-relative">
                                <a
                                  href="../dark/app-chat.html"
                                  className="d-flex align-items-center pb-9 position-relative"
                                >
                                  <div className="bg-primary-subtle rounded round-48 me-3 d-flex align-items-center justify-content-center">
                                    <iconify-icon
                                      icon="solar:chat-line-bold-duotone"
                                      className="fs-7 text-primary"
                                    />
                                  </div>
                                  <div>
                                    <h6 className="mb-0">Chat Application</h6>
                                    <span className="fs-11 d-block text-body-color">
                                      New messages arrived
                                    </span>
                                  </div>
                                </a>
                                <a
                                  href="../dark/app-invoice.html"
                                  className="d-flex align-items-center pb-9 position-relative"
                                >
                                  <div className="bg-secondary-subtle rounded round-48 me-3 d-flex align-items-center justify-content-center">
                                    <iconify-icon
                                      icon="solar:bill-list-bold-duotone"
                                      className="fs-7 text-secondary"
                                    />
                                  </div>
                                  <div>
                                    <h6 className="mb-0">Invoice App</h6>
                                    <span className="fs-11 d-block text-body-color">
                                      Get latest invoice
                                    </span>
                                  </div>
                                </a>
                                <a
                                  href="../dark/app-contact2.html"
                                  className="d-flex align-items-center pb-9 position-relative"
                                >
                                  <div className="bg-warning-subtle rounded round-48 me-3 d-flex align-items-center justify-content-center">
                                    <iconify-icon
                                      icon="solar:phone-calling-rounded-bold-duotone"
                                      className="fs-7 text-warning"
                                    />
                                  </div>
                                  <div>
                                    <h6 className="mb-0">
                                      Contact Application
                                    </h6>
                                    <span className="fs-11 d-block text-body-color">
                                      2 Unsaved Contacts
                                    </span>
                                  </div>
                                </a>
                                <a
                                  href="../dark/app-email.html"
                                  className="d-flex align-items-center pb-9 position-relative"
                                >
                                  <div className="bg-danger-subtle rounded round-48 me-3 d-flex align-items-center justify-content-center">
                                    <iconify-icon
                                      icon="solar:letter-bold-duotone"
                                      className="fs-7 text-danger"
                                    />
                                  </div>
                                  <div>
                                    <h6 className="mb-0">Email App</h6>
                                    <span className="fs-11 d-block text-body-color">
                                      Get new emails
                                    </span>
                                  </div>
                                </a>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="position-relative">
                                <a
                                  href="../dark/page-user-profile.html"
                                  className="d-flex align-items-center pb-9 position-relative"
                                >
                                  <div className="bg-success-subtle rounded round-48 me-3 d-flex align-items-center justify-content-center">
                                    <iconify-icon
                                      icon="solar:user-bold-duotone"
                                      className="fs-7 text-success"
                                    />
                                  </div>
                                  <div>
                                    <h6 className="mb-0">User Profile</h6>
                                    <span className="fs-11 d-block text-body-color">
                                      learn more information
                                    </span>
                                  </div>
                                </a>
                                <a
                                  href="../dark/app-calendar.html"
                                  className="d-flex align-items-center pb-9 position-relative"
                                >
                                  <div className="bg-primary-subtle rounded round-48 me-3 d-flex align-items-center justify-content-center">
                                    <iconify-icon
                                      icon="solar:calendar-minimalistic-bold-duotone"
                                      className="fs-7 text-primary"
                                    />
                                  </div>
                                  <div>
                                    <h6 className="mb-0">Calendar App</h6>
                                    <span className="fs-11 d-block text-body-color">
                                      Get dates
                                    </span>
                                  </div>
                                </a>
                                <a
                                  href="../dark/app-contact.html"
                                  className="d-flex align-items-center pb-9 position-relative"
                                >
                                  <div className="bg-secondary-subtle rounded round-48 me-3 d-flex align-items-center justify-content-center">
                                    <iconify-icon
                                      icon="solar:smartphone-2-bold-duotone"
                                      className="fs-7 text-secondary"
                                    />
                                  </div>
                                  <div>
                                    <h6 className="mb-0">Contact List Table</h6>
                                    <span className="fs-11 d-block text-body-color">
                                      Add new contact
                                    </span>
                                  </div>
                                </a>
                                <a
                                  href="../dark/app-notes.html"
                                  className="d-flex align-items-center pb-9 position-relative"
                                >
                                  <div className="bg-warning-subtle rounded round-48 me-3 d-flex align-items-center justify-content-center">
                                    <iconify-icon
                                      icon="solar:notes-bold-duotone"
                                      className="fs-7 text-warning"
                                    />
                                  </div>
                                  <div>
                                    <h6 className="mb-0">Notes Application</h6>
                                    <span className="fs-11 d-block text-body-color">
                                      To-do and Daily tasks
                                    </span>
                                  </div>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-4 d-none d-lg-flex">
                        <img
                          src="../assets/images/backgrounds/mega-dd-bg.jpg"
                          alt="mega-dd"
                          className="img-fluid mega-dd-bg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <div className="d-block d-lg-none py-9 py-xl-0">
            <img src="../assets/images/logos/logo.svg" alt="matdash-img" />
          </div>
          <a
            className="navbar-toggler p-0 border-0 nav-icon-hover-bg rounded-circle"
            href="javascript:void(0)"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <iconify-icon
              icon="solar:menu-dots-bold-duotone"
              className="fs-6"
            />
          </a>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <div className="d-flex align-items-center justify-content-between">
              <ul className="navbar-nav flex-row mx-auto ms-lg-auto align-items-center justify-content-center">
                <li className="nav-item dropdown">
                  <a
                    href="javascript:void(0)"
                    className="nav-link nav-icon-hover-bg rounded-circle d-flex d-lg-none align-items-center justify-content-center"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#mobilenavbar"
                    aria-controls="offcanvasWithBothOptions"
                  >
                    <iconify-icon
                      icon="solar:sort-line-duotone"
                      className="fs-6"
                    />
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link moon dark-layout nav-icon-hover-bg rounded-circle"
                    href="javascript:void(0)"
                  >
                    <iconify-icon
                      icon="solar:moon-line-duotone"
                      className="moon fs-6"
                    />
                  </a>
                  <a
                    className="nav-link sun light-layout nav-icon-hover-bg rounded-circle"
                    href="javascript:void(0)"
                    style={{ display: "none" }}
                  >
                    <iconify-icon
                      icon="solar:sun-2-line-duotone"
                      className="sun fs-6"
                    />
                  </a>
                </li>
                <li className="nav-item d-block d-xl-none">
                  <a
                    className="nav-link nav-icon-hover-bg rounded-circle"
                    href="javascript:void(0)"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    <iconify-icon
                      icon="solar:magnifer-line-duotone"
                      className="fs-6"
                    />
                  </a>
                </li>
                {/* ------------------------------- */}
                {/* start notification Dropdown */}
                {/* ------------------------------- */}
                <li className="nav-item dropdown nav-icon-hover-bg rounded-circle">
                  <a
                    className="nav-link position-relative"
                    href="javascript:void(0)"
                    id="drop2"
                    aria-expanded="false"
                  >
                    <iconify-icon
                      icon="solar:bell-bing-line-duotone"
                      className="fs-6"
                    />
                  </a>
                  <div
                    className="dropdown-menu content-dd dropdown-menu-end dropdown-menu-animate-up"
                    aria-labelledby="drop2"
                  >
                    <div className="d-flex align-items-center justify-content-between py-3 px-7">
                      <h5 className="mb-0 fs-5 fw-semibold">Notifications</h5>
                      <span className="badge text-bg-primary rounded-4 px-3 py-1 lh-sm">
                        5 new
                      </span>
                    </div>
                    <div className="message-body" data-simplebar>
                      <a
                        href="javascript:void(0)"
                        className="py-6 px-7 d-flex align-items-center dropdown-item gap-3"
                      >
                        <span className="flex-shrink-0 bg-danger-subtle rounded-circle round d-flex align-items-center justify-content-center fs-6 text-danger">
                          <iconify-icon icon="solar:widget-3-line-duotone" />
                        </span>
                        <div className="w-75">
                          <div className="d-flex align-items-center justify-content-between">
                            <h6 className="mb-1 fw-semibold">Launch Admin</h6>
                            <span className="d-block fs-2">9:30 AM</span>
                          </div>
                          <span className="d-block text-truncate text-truncate fs-11">
                            Just see the my new admin!
                          </span>
                        </div>
                      </a>
                      <a
                        href="javascript:void(0)"
                        className="py-6 px-7 d-flex align-items-center dropdown-item gap-3"
                      >
                        <span className="flex-shrink-0 bg-primary-subtle rounded-circle round d-flex align-items-center justify-content-center fs-6 text-primary">
                          <iconify-icon icon="solar:calendar-line-duotone" />
                        </span>
                        <div className="w-75">
                          <div className="d-flex align-items-center justify-content-between">
                            <h6 className="mb-1 fw-semibold">Event today</h6>
                            <span className="d-block fs-2">9:15 AM</span>
                          </div>
                          <span className="d-block text-truncate text-truncate fs-11">
                            Just a reminder that you have event
                          </span>
                        </div>
                      </a>
                      <a
                        href="javascript:void(0)"
                        className="py-6 px-7 d-flex align-items-center dropdown-item gap-3"
                      >
                        <span className="flex-shrink-0 bg-secondary-subtle rounded-circle round d-flex align-items-center justify-content-center fs-6 text-secondary">
                          <iconify-icon icon="solar:settings-line-duotone" />
                        </span>
                        <div className="w-75">
                          <div className="d-flex align-items-center justify-content-between">
                            <h6 className="mb-1 fw-semibold">Settings</h6>
                            <span className="d-block fs-2">4:36 PM</span>
                          </div>
                          <span className="d-block text-truncate text-truncate fs-11">
                            You can customize this template as you want
                          </span>
                        </div>
                      </a>
                      <a
                        href="javascript:void(0)"
                        className="py-6 px-7 d-flex align-items-center dropdown-item gap-3"
                      >
                        <span className="flex-shrink-0 bg-warning-subtle rounded-circle round d-flex align-items-center justify-content-center fs-6 text-warning">
                          <iconify-icon icon="solar:widget-4-line-duotone" />
                        </span>
                        <div className="w-75">
                          <div className="d-flex align-items-center justify-content-between">
                            <h6 className="mb-1 fw-semibold">Launch Admin</h6>
                            <span className="d-block fs-2">9:30 AM</span>
                          </div>
                          <span className="d-block text-truncate text-truncate fs-11">
                            Just see the my new admin!
                          </span>
                        </div>
                      </a>
                      <a
                        href="javascript:void(0)"
                        className="py-6 px-7 d-flex align-items-center dropdown-item gap-3"
                      >
                        <span className="flex-shrink-0 bg-primary-subtle rounded-circle round d-flex align-items-center justify-content-center fs-6 text-primary">
                          <iconify-icon icon="solar:calendar-line-duotone" />
                        </span>
                        <div className="w-75">
                          <div className="d-flex align-items-center justify-content-between">
                            <h6 className="mb-1 fw-semibold">Event today</h6>
                            <span className="d-block fs-2">9:15 AM</span>
                          </div>
                          <span className="d-block text-truncate text-truncate fs-11">
                            Just a reminder that you have event
                          </span>
                        </div>
                      </a>
                      <a
                        href="javascript:void(0)"
                        className="py-6 px-7 d-flex align-items-center dropdown-item gap-3"
                      >
                        <span className="flex-shrink-0 bg-secondary-subtle rounded-circle round d-flex align-items-center justify-content-center fs-6 text-secondary">
                          <iconify-icon icon="solar:settings-line-duotone" />
                        </span>
                        <div className="w-75">
                          <div className="d-flex align-items-center justify-content-between">
                            <h6 className="mb-1 fw-semibold">Settings</h6>
                            <span className="d-block fs-2">4:36 PM</span>
                          </div>
                          <span className="d-block text-truncate text-truncate fs-11">
                            You can customize this template as you want
                          </span>
                        </div>
                      </a>
                    </div>
                    <div className="py-6 px-7 mb-1">
                      <button className="btn btn-primary w-100">
                        See All Notifications
                      </button>
                    </div>
                  </div>
                </li>
                {/* ------------------------------- */}
                {/* end notification Dropdown */}
                {/* ------------------------------- */}
                {/* ------------------------------- */}
                {/* start language Dropdown */}
                {/* ------------------------------- */}
                <li className="nav-item dropdown nav-icon-hover-bg rounded-circle">
                  <a
                    className="nav-link"
                    href="javascript:void(0)"
                    id="drop2"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src="../assets/images/flag/icon-flag-en.svg"
                      alt="matdash-img"
                      width="20px"
                      height="20px"
                      className="rounded-circle object-fit-cover round-20"
                    />
                  </a>
                  <div
                    className="dropdown-menu dropdown-menu-end dropdown-menu-animate-up"
                    aria-labelledby="drop2"
                  >
                    <div className="message-body">
                      <a
                        href="javascript:void(0)"
                        className="d-flex align-items-center gap-2 py-3 px-4 dropdown-item"
                      >
                        <div className="position-relative">
                          <img
                            src="../assets/images/flag/icon-flag-en.svg"
                            alt="matdash-img"
                            width="20px"
                            height="20px"
                            className="rounded-circle object-fit-cover round-20"
                          />
                        </div>
                        <p className="mb-0 fs-3">English (UK)</p>
                      </a>
                      <a
                        href="javascript:void(0)"
                        className="d-flex align-items-center gap-2 py-3 px-4 dropdown-item"
                      >
                        <div className="position-relative">
                          <img
                            src="../assets/images/flag/icon-flag-cn.svg"
                            alt="matdash-img"
                            width="20px"
                            height="20px"
                            className="rounded-circle object-fit-cover round-20"
                          />
                        </div>
                        <p className="mb-0 fs-3">中国人 (Chinese)</p>
                      </a>
                      <a
                        href="javascript:void(0)"
                        className="d-flex align-items-center gap-2 py-3 px-4 dropdown-item"
                      >
                        <div className="position-relative">
                          <img
                            src="../assets/images/flag/icon-flag-fr.svg"
                            alt="matdash-img"
                            width="20px"
                            height="20px"
                            className="rounded-circle object-fit-cover round-20"
                          />
                        </div>
                        <p className="mb-0 fs-3">français (French)</p>
                      </a>
                      <a
                        href="javascript:void(0)"
                        className="d-flex align-items-center gap-2 py-3 px-4 dropdown-item"
                      >
                        <div className="position-relative">
                          <img
                            src="../assets/images/flag/icon-flag-sa.svg"
                            alt="matdash-img"
                            width="20px"
                            height="20px"
                            className="rounded-circle object-fit-cover round-20"
                          />
                        </div>
                        <p className="mb-0 fs-3">عربي (Arabic)</p>
                      </a>
                    </div>
                  </div>
                </li>
                {/* ------------------------------- */}
                {/* end language Dropdown */}
                {/* ------------------------------- */}
                {/* ------------------------------- */}
                {/* start profile Dropdown */}
                {/* ------------------------------- */}
                <li className="nav-item dropdown">
                  <a
                    className="nav-link"
                    href="javascript:void(0)"
                    id="drop1"
                    aria-expanded="false"
                  >
                    <div className="d-flex align-items-center gap-2 lh-base">
                      <img
                        src="../assets/images/profile/user-1.jpg"
                        className="rounded-circle"
                        width={35}
                        height={35}
                        alt="matdash-img"
                      />
                      <iconify-icon
                        icon="solar:alt-arrow-down-bold"
                        className="fs-2"
                      />
                    </div>
                  </a>
                  <div
                    className="dropdown-menu profile-dropdown dropdown-menu-end dropdown-menu-animate-up"
                    aria-labelledby="drop1"
                  >
                    <div className="position-relative px-4 pt-3 pb-2">
                      <div className="d-flex align-items-center mb-3 pb-3 border-bottom gap-6">
                        <img
                          src="../assets/images/profile/user-1.jpg"
                          className="rounded-circle"
                          width={56}
                          height={56}
                          alt="matdash-img"
                        />
                        <div>
                          <h5 className="mb-0 fs-12">
                            David McMichael{" "}
                            <span className="text-success fs-11">Pro</span>
                          </h5>
                          <p className="mb-0 text-dark">david@wrappixel.com</p>
                        </div>
                      </div>
                      <div className="message-body">
                        <a
                          href="javascript:void(0)"
                          className="p-2 dropdown-item h6 rounded-1"
                        >
                          My Profile
                        </a>
                        <a
                          href="javascript:void(0)"
                          className="p-2 dropdown-item h6 rounded-1"
                        >
                          My Subscription
                        </a>
                        <a
                          href="javascript:void(0)"
                          className="p-2 dropdown-item h6 rounded-1"
                        >
                          My Statements{" "}
                          <span className="badge bg-danger-subtle text-danger rounded ms-8">
                            4
                          </span>
                        </a>
                        <a
                          href="javascript:void(0)"
                          className="p-2 dropdown-item h6 rounded-1"
                        >
                          Account Settings
                        </a>
                        <a
                          href="../dark/authentication-login2.html"
                          className="p-2 dropdown-item h6 rounded-1"
                        >
                          Sign Out
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
                {/* ------------------------------- */}
                {/* end profile Dropdown */}
                {/* ------------------------------- */}
              </ul>
            </div>
          </div>
        </nav>
        {/* ---------------------------------- */}
        {/* End Vertical Layout Header */}
        {/* ---------------------------------- */}
        {/* ------------------------------- */}
        {/* apps Dropdown in Small screen */}
        {/* ------------------------------- */}
        {/*  Mobilenavbar */}
        <div
          className="offcanvas offcanvas-start pt-0"
          data-bs-scroll="true"
          tabIndex={-1}
          id="mobilenavbar"
          aria-labelledby="offcanvasWithBothOptionsLabel"
        >
          <nav className="sidebar-nav scroll-sidebar">
            <div className="offcanvas-header justify-content-between">
              <a href="../dark/index.html" className="text-nowrap logo-img">
                <img src="../assets/images/logos/logo-icon.svg" alt="Logo" />
              </a>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              />
            </div>
            <div
              className="offcanvas-body pt-0"
              data-simplebar
              style={{ height: "calc(100vh - 80px)" }}
            >
              <ul id="sidebarnav">
                <li className="sidebar-item">
                  <a
                    className="sidebar-link has-arrow ms-0"
                    href="javascript:void(0)"
                    aria-expanded="false"
                  >
                    <span>
                      <iconify-icon
                        icon="solar:slider-vertical-line-duotone"
                        className="fs-7"
                      />
                    </span>
                    <span className="hide-menu">Apps</span>
                  </a>
                  <ul
                    aria-expanded="false"
                    className="collapse first-level my-3 ps-3"
                  >
                    <li className="sidebar-item py-2">
                      <a
                        href="../dark/app-chat.html"
                        className="d-flex align-items-center"
                      >
                        <div className="bg-primary-subtle rounded round-48 me-3 d-flex align-items-center justify-content-center">
                          <iconify-icon
                            icon="solar:chat-line-bold-duotone"
                            className="fs-7 text-primary"
                          />
                        </div>
                        <div>
                          <h6 className="mb-0 bg-hover-primary">
                            Chat Application
                          </h6>
                          <span className="fs-11 d-block text-body-color">
                            New messages arrived
                          </span>
                        </div>
                      </a>
                    </li>
                    <li className="sidebar-item py-2">
                      <a
                        href="../dark/app-invoice.html"
                        className="d-flex align-items-center"
                      >
                        <div className="bg-secondary-subtle rounded round-48 me-3 d-flex align-items-center justify-content-center">
                          <iconify-icon
                            icon="solar:bill-list-bold-duotone"
                            className="fs-7 text-secondary"
                          />
                        </div>
                        <div>
                          <h6 className="mb-0 bg-hover-primary">Invoice App</h6>
                          <span className="fs-11 d-block text-body-color">
                            Get latest invoice
                          </span>
                        </div>
                      </a>
                    </li>
                    <li className="sidebar-item py-2">
                      <a
                        href="../dark/app-contact2.html"
                        className="d-flex align-items-center"
                      >
                        <div className="bg-warning-subtle rounded round-48 me-3 d-flex align-items-center justify-content-center">
                          <iconify-icon
                            icon="solar:phone-calling-rounded-bold-duotone"
                            className="fs-7 text-warning"
                          />
                        </div>
                        <div>
                          <h6 className="mb-0 bg-hover-primary">
                            Contact Application
                          </h6>
                          <span className="fs-11 d-block text-body-color">
                            2 Unsaved Contacts
                          </span>
                        </div>
                      </a>
                    </li>
                    <li className="sidebar-item py-2">
                      <a
                        href="../dark/app-email.html"
                        className="d-flex align-items-center"
                      >
                        <div className="bg-danger-subtle rounded round-48 me-3 d-flex align-items-center justify-content-center">
                          <iconify-icon
                            icon="solar:letter-bold-duotone"
                            className="fs-7 text-danger"
                          />
                        </div>
                        <div>
                          <h6 className="mb-0 bg-hover-primary">Email App</h6>
                          <span className="fs-11 d-block text-body-color">
                            Get new emails
                          </span>
                        </div>
                      </a>
                    </li>
                    <li className="sidebar-item py-2">
                      <a
                        href="../dark/page-user-profile.html"
                        className="d-flex align-items-center"
                      >
                        <div className="bg-success-subtle rounded round-48 me-3 d-flex align-items-center justify-content-center">
                          <iconify-icon
                            icon="solar:user-bold-duotone"
                            className="fs-7 text-success"
                          />
                        </div>
                        <div>
                          <h6 className="mb-0 bg-hover-primary">
                            User Profile
                          </h6>
                          <span className="fs-11 d-block text-body-color">
                            learn more information
                          </span>
                        </div>
                      </a>
                    </li>
                    <li className="sidebar-item py-2">
                      <a
                        href="../dark/app-calendar.html"
                        className="d-flex align-items-center"
                      >
                        <div className="bg-primary-subtle rounded round-48 me-3 d-flex align-items-center justify-content-center">
                          <iconify-icon
                            icon="solar:calendar-minimalistic-bold-duotone"
                            className="fs-7 text-primary"
                          />
                        </div>
                        <div>
                          <h6 className="mb-0 bg-hover-primary">
                            Calendar App
                          </h6>
                          <span className="fs-11 d-block text-body-color">
                            Get dates
                          </span>
                        </div>
                      </a>
                    </li>
                    <li className="sidebar-item py-2">
                      <a
                        href="../dark/app-contact.html"
                        className="d-flex align-items-center"
                      >
                        <div className="bg-secondary-subtle rounded round-48 me-3 d-flex align-items-center justify-content-center">
                          <iconify-icon
                            icon="solar:smartphone-2-bold-duotone"
                            className="fs-7 text-secondary"
                          />
                        </div>
                        <div>
                          <h6 className="mb-0 bg-hover-primary">
                            Contact List Table
                          </h6>
                          <span className="fs-11 d-block text-body-color">
                            Add new contact
                          </span>
                        </div>
                      </a>
                    </li>
                    <li className="sidebar-item py-2">
                      <a
                        href="../dark/app-notes.html"
                        className="d-flex align-items-center"
                      >
                        <div className="bg-warning-subtle rounded round-48 me-3 d-flex align-items-center justify-content-center">
                          <iconify-icon
                            icon="solar:notes-bold-duotone"
                            className="fs-7 text-warning"
                          />
                        </div>
                        <div>
                          <h6 className="mb-0 bg-hover-primary">
                            Notes Application
                          </h6>
                          <span className="fs-11 d-block text-body-color">
                            To-do and Daily tasks
                          </span>
                        </div>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
      <div className="app-header with-horizontal">
        <nav className="navbar navbar-expand-xl container-fluid p-0">
          <ul className="navbar-nav align-items-center">
            <li className="nav-item d-flex d-xl-none">
              <a
                className="nav-link sidebartoggler nav-icon-hover-bg rounded-circle"
                id="sidebarCollapse"
                href="javascript:void(0)"
              >
                <iconify-icon
                  icon="solar:hamburger-menu-line-duotone"
                  className="fs-7"
                />
              </a>
            </li>
            <li className="nav-item d-none d-xl-flex align-items-center">
              <a href="../dark/index.html" className="text-nowrap nav-link">
                <img src="../assets/images/logos/logo.svg" alt="matdash-img" />
              </a>
            </li>
            <li className="nav-item d-none d-xl-flex align-items-center nav-icon-hover-bg rounded-circle">
              <a
                className="nav-link"
                href="javascript:void(0)"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                <iconify-icon icon="solar:magnifer-linear" className="fs-6" />
              </a>
            </li>
            <li className="nav-item d-none d-lg-flex align-items-center dropdown nav-icon-hover-bg rounded-circle">
              <div className="hover-dd">
                <a
                  className="nav-link"
                  id="drop2"
                  href="javascript:void(0)"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <iconify-icon
                    icon="solar:widget-3-line-duotone"
                    className="fs-6"
                  />
                </a>
                <div
                  className="dropdown-menu dropdown-menu-nav dropdown-menu-animate-up py-0 overflow-hidden"
                  aria-labelledby="drop2"
                >
                  <div className="position-relative">
                    <div className="row">
                      <div className="col-md-8">
                        <div className="p-4 pb-3">
                          <div className="row">
                            <div className="col-md-6">
                              <div className="position-relative">
                                <a
                                  href="../dark/app-chat.html"
                                  className="d-flex align-items-center pb-9 position-relative"
                                >
                                  <div className="bg-primary-subtle rounded round-48 me-3 d-flex align-items-center justify-content-center">
                                    <iconify-icon
                                      icon="solar:chat-line-bold-duotone"
                                      className="fs-7 text-primary"
                                    />
                                  </div>
                                  <div>
                                    <h6 className="mb-0">Chat Application</h6>
                                    <span className="fs-11 d-block text-body-color">
                                      New messages arrived
                                    </span>
                                  </div>
                                </a>
                                <a
                                  href="../dark/app-invoice.html"
                                  className="d-flex align-items-center pb-9 position-relative"
                                >
                                  <div className="bg-secondary-subtle rounded round-48 me-3 d-flex align-items-center justify-content-center">
                                    <iconify-icon
                                      icon="solar:bill-list-bold-duotone"
                                      className="fs-7 text-secondary"
                                    />
                                  </div>
                                  <div>
                                    <h6 className="mb-0">Invoice App</h6>
                                    <span className="fs-11 d-block text-body-color">
                                      Get latest invoice
                                    </span>
                                  </div>
                                </a>
                                <a
                                  href="../dark/app-contact2.html"
                                  className="d-flex align-items-center pb-9 position-relative"
                                >
                                  <div className="bg-warning-subtle rounded round-48 me-3 d-flex align-items-center justify-content-center">
                                    <iconify-icon
                                      icon="solar:phone-calling-rounded-bold-duotone"
                                      className="fs-7 text-warning"
                                    />
                                  </div>
                                  <div>
                                    <h6 className="mb-0">
                                      Contact Application
                                    </h6>
                                    <span className="fs-11 d-block text-body-color">
                                      2 Unsaved Contacts
                                    </span>
                                  </div>
                                </a>
                                <a
                                  href="../dark/app-email.html"
                                  className="d-flex align-items-center pb-9 position-relative"
                                >
                                  <div className="bg-danger-subtle rounded round-48 me-3 d-flex align-items-center justify-content-center">
                                    <iconify-icon
                                      icon="solar:letter-bold-duotone"
                                      className="fs-7 text-danger"
                                    />
                                  </div>
                                  <div>
                                    <h6 className="mb-0">Email App</h6>
                                    <span className="fs-11 d-block text-body-color">
                                      Get new emails
                                    </span>
                                  </div>
                                </a>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="position-relative">
                                <a
                                  href="../dark/page-user-profile.html"
                                  className="d-flex align-items-center pb-9 position-relative"
                                >
                                  <div className="bg-success-subtle rounded round-48 me-3 d-flex align-items-center justify-content-center">
                                    <iconify-icon
                                      icon="solar:user-bold-duotone"
                                      className="fs-7 text-success"
                                    />
                                  </div>
                                  <div>
                                    <h6 className="mb-0">User Profile</h6>
                                    <span className="fs-11 d-block text-body-color">
                                      learn more information
                                    </span>
                                  </div>
                                </a>
                                <a
                                  href="../dark/app-calendar.html"
                                  className="d-flex align-items-center pb-9 position-relative"
                                >
                                  <div className="bg-primary-subtle rounded round-48 me-3 d-flex align-items-center justify-content-center">
                                    <iconify-icon
                                      icon="solar:calendar-minimalistic-bold-duotone"
                                      className="fs-7 text-primary"
                                    />
                                  </div>
                                  <div>
                                    <h6 className="mb-0">Calendar App</h6>
                                    <span className="fs-11 d-block text-body-color">
                                      Get dates
                                    </span>
                                  </div>
                                </a>
                                <a
                                  href="../dark/app-contact.html"
                                  className="d-flex align-items-center pb-9 position-relative"
                                >
                                  <div className="bg-secondary-subtle rounded round-48 me-3 d-flex align-items-center justify-content-center">
                                    <iconify-icon
                                      icon="solar:smartphone-2-bold-duotone"
                                      className="fs-7 text-secondary"
                                    />
                                  </div>
                                  <div>
                                    <h6 className="mb-0">Contact List Table</h6>
                                    <span className="fs-11 d-block text-body-color">
                                      Add new contact
                                    </span>
                                  </div>
                                </a>
                                <a
                                  href="../dark/app-notes.html"
                                  className="d-flex align-items-center pb-9 position-relative"
                                >
                                  <div className="bg-warning-subtle rounded round-48 me-3 d-flex align-items-center justify-content-center">
                                    <iconify-icon
                                      icon="solar:notes-bold-duotone"
                                      className="fs-7 text-warning"
                                    />
                                  </div>
                                  <div>
                                    <h6 className="mb-0">Notes Application</h6>
                                    <span className="fs-11 d-block text-body-color">
                                      To-do and Daily tasks
                                    </span>
                                  </div>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-4 d-none d-lg-flex">
                        <img
                          src="../assets/images/backgrounds/mega-dd-bg.jpg"
                          alt="mega-dd"
                          className="img-fluid mega-dd-bg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <div className="d-block d-xl-none">
            <a href="../dark/index.html" className="text-nowrap nav-link">
              <img src="../assets/images/logos/logo.svg" alt="matdash-img" />
            </a>
          </div>
          <a
            className="navbar-toggler nav-icon-hover p-0 border-0 nav-icon-hover-bg rounded-circle"
            href="javascript:void(0)"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="p-2">
              <i className="ti ti-dots fs-7" />
            </span>
          </a>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <div className="d-flex align-items-center justify-content-between px-0 px-xl-8">
              <ul className="navbar-nav flex-row mx-auto ms-lg-auto align-items-center justify-content-center">
                <li className="nav-item dropdown">
                  <a
                    href="javascript:void(0)"
                    className="nav-link nav-icon-hover-bg rounded-circle d-flex d-lg-none align-items-center justify-content-center"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#mobilenavbar"
                    aria-controls="offcanvasWithBothOptions"
                  >
                    <iconify-icon
                      icon="solar:sort-line-duotone"
                      className="fs-6"
                    />
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link nav-icon-hover-bg rounded-circle moon dark-layout"
                    href="javascript:void(0)"
                  >
                    <iconify-icon
                      icon="solar:moon-line-duotone"
                      className="moon fs-6"
                    />
                  </a>
                  <a
                    className="nav-link nav-icon-hover-bg rounded-circle sun light-layout"
                    href="javascript:void(0)"
                    style={{ display: "none" }}
                  >
                    <iconify-icon
                      icon="solar:sun-2-line-duotone"
                      className="sun fs-6"
                    />
                  </a>
                </li>
                <li className="nav-item d-block d-xl-none">
                  <a
                    className="nav-link nav-icon-hover-bg rounded-circle"
                    href="javascript:void(0)"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    <iconify-icon
                      icon="solar:magnifer-line-duotone"
                      className="fs-6"
                    />
                  </a>
                </li>
                {/* ------------------------------- */}
                {/* start notification Dropdown */}
                {/* ------------------------------- */}
                <li className="nav-item dropdown nav-icon-hover-bg rounded-circle">
                  <a
                    className="nav-link position-relative"
                    href="javascript:void(0)"
                    id="drop2"
                    aria-expanded="false"
                  >
                    <iconify-icon
                      icon="solar:bell-bing-line-duotone"
                      className="fs-6"
                    />
                  </a>
                  <div
                    className="dropdown-menu content-dd dropdown-menu-end dropdown-menu-animate-up"
                    aria-labelledby="drop2"
                  >
                    <div className="d-flex align-items-center justify-content-between py-3 px-7">
                      <h5 className="mb-0 fs-5 fw-semibold">Notifications</h5>
                      <span className="badge text-bg-primary rounded-4 px-3 py-1 lh-sm">
                        5 new
                      </span>
                    </div>
                    <div className="message-body" data-simplebar>
                      <a
                        href="javascript:void(0)"
                        className="py-6 px-7 d-flex align-items-center dropdown-item gap-3"
                      >
                        <span className="flex-shrink-0 bg-danger-subtle rounded-circle round d-flex align-items-center justify-content-center fs-6 text-danger">
                          <iconify-icon icon="solar:widget-3-line-duotone" />
                        </span>
                        <div className="w-75">
                          <div className="d-flex align-items-center justify-content-between">
                            <h6 className="mb-1 fw-semibold">Launch Admin</h6>
                            <span className="d-block fs-2">9:30 AM</span>
                          </div>
                          <span className="d-block text-truncate text-truncate fs-11">
                            Just see the my new admin!
                          </span>
                        </div>
                      </a>
                      <a
                        href="javascript:void(0)"
                        className="py-6 px-7 d-flex align-items-center dropdown-item gap-3"
                      >
                        <span className="flex-shrink-0 bg-primary-subtle rounded-circle round d-flex align-items-center justify-content-center fs-6 text-primary">
                          <iconify-icon icon="solar:calendar-line-duotone" />
                        </span>
                        <div className="w-75">
                          <div className="d-flex align-items-center justify-content-between">
                            <h6 className="mb-1 fw-semibold">Event today</h6>
                            <span className="d-block fs-2">9:15 AM</span>
                          </div>
                          <span className="d-block text-truncate text-truncate fs-11">
                            Just a reminder that you have event
                          </span>
                        </div>
                      </a>
                      <a
                        href="javascript:void(0)"
                        className="py-6 px-7 d-flex align-items-center dropdown-item gap-3"
                      >
                        <span className="flex-shrink-0 bg-secondary-subtle rounded-circle round d-flex align-items-center justify-content-center fs-6 text-secondary">
                          <iconify-icon icon="solar:settings-line-duotone" />
                        </span>
                        <div className="w-75">
                          <div className="d-flex align-items-center justify-content-between">
                            <h6 className="mb-1 fw-semibold">Settings</h6>
                            <span className="d-block fs-2">4:36 PM</span>
                          </div>
                          <span className="d-block text-truncate text-truncate fs-11">
                            You can customize this template as you want
                          </span>
                        </div>
                      </a>
                      <a
                        href="javascript:void(0)"
                        className="py-6 px-7 d-flex align-items-center dropdown-item gap-3"
                      >
                        <span className="flex-shrink-0 bg-warning-subtle rounded-circle round d-flex align-items-center justify-content-center fs-6 text-warning">
                          <iconify-icon icon="solar:widget-4-line-duotone" />
                        </span>
                        <div className="w-75">
                          <div className="d-flex align-items-center justify-content-between">
                            <h6 className="mb-1 fw-semibold">Launch Admin</h6>
                            <span className="d-block fs-2">9:30 AM</span>
                          </div>
                          <span className="d-block text-truncate text-truncate fs-11">
                            Just see the my new admin!
                          </span>
                        </div>
                      </a>
                      <a
                        href="javascript:void(0)"
                        className="py-6 px-7 d-flex align-items-center dropdown-item gap-3"
                      >
                        <span className="flex-shrink-0 bg-primary-subtle rounded-circle round d-flex align-items-center justify-content-center fs-6 text-primary">
                          <iconify-icon icon="solar:calendar-line-duotone" />
                        </span>
                        <div className="w-75">
                          <div className="d-flex align-items-center justify-content-between">
                            <h6 className="mb-1 fw-semibold">Event today</h6>
                            <span className="d-block fs-2">9:15 AM</span>
                          </div>
                          <span className="d-block text-truncate text-truncate fs-11">
                            Just a reminder that you have event
                          </span>
                        </div>
                      </a>
                      <a
                        href="javascript:void(0)"
                        className="py-6 px-7 d-flex align-items-center dropdown-item gap-3"
                      >
                        <span className="flex-shrink-0 bg-secondary-subtle rounded-circle round d-flex align-items-center justify-content-center fs-6 text-secondary">
                          <iconify-icon icon="solar:settings-line-duotone" />
                        </span>
                        <div className="w-75">
                          <div className="d-flex align-items-center justify-content-between">
                            <h6 className="mb-1 fw-semibold">Settings</h6>
                            <span className="d-block fs-2">4:36 PM</span>
                          </div>
                          <span className="d-block text-truncate text-truncate fs-11">
                            You can customize this template as you want
                          </span>
                        </div>
                      </a>
                    </div>
                    <div className="py-6 px-7 mb-1">
                      <button className="btn btn-primary w-100">
                        See All Notifications
                      </button>
                    </div>
                  </div>
                </li>
                {/* ------------------------------- */}
                {/* end notification Dropdown */}
                {/* ------------------------------- */}
                {/* ------------------------------- */}
                {/* start language Dropdown */}
                {/* ------------------------------- */}
                <li className="nav-item dropdown nav-icon-hover-bg rounded-circle">
                  <a
                    className="nav-link"
                    href="javascript:void(0)"
                    id="drop2"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src="../assets/images/flag/icon-flag-en.svg"
                      alt="matdash-img"
                      width="20px"
                      height="20px"
                      className="rounded-circle object-fit-cover round-20"
                    />
                  </a>
                  <div
                    className="dropdown-menu dropdown-menu-end dropdown-menu-animate-up"
                    aria-labelledby="drop2"
                  >
                    <div className="message-body">
                      <a
                        href="javascript:void(0)"
                        className="d-flex align-items-center gap-2 py-3 px-4 dropdown-item"
                      >
                        <div className="position-relative">
                          <img
                            src="../assets/images/flag/icon-flag-en.svg"
                            alt="matdash-img"
                            width="20px"
                            height="20px"
                            className="rounded-circle object-fit-cover round-20"
                          />
                        </div>
                        <p className="mb-0 fs-3">English (UK)</p>
                      </a>
                      <a
                        href="javascript:void(0)"
                        className="d-flex align-items-center gap-2 py-3 px-4 dropdown-item"
                      >
                        <div className="position-relative">
                          <img
                            src="../assets/images/flag/icon-flag-cn.svg"
                            alt="matdash-img"
                            width="20px"
                            height="20px"
                            className="rounded-circle object-fit-cover round-20"
                          />
                        </div>
                        <p className="mb-0 fs-3">中国人 (Chinese)</p>
                      </a>
                      <a
                        href="javascript:void(0)"
                        className="d-flex align-items-center gap-2 py-3 px-4 dropdown-item"
                      >
                        <div className="position-relative">
                          <img
                            src="../assets/images/flag/icon-flag-fr.svg"
                            alt="matdash-img"
                            width="20px"
                            height="20px"
                            className="rounded-circle object-fit-cover round-20"
                          />
                        </div>
                        <p className="mb-0 fs-3">français (French)</p>
                      </a>
                      <a
                        href="javascript:void(0)"
                        className="d-flex align-items-center gap-2 py-3 px-4 dropdown-item"
                      >
                        <div className="position-relative">
                          <img
                            src="../assets/images/flag/icon-flag-sa.svg"
                            alt="matdash-img"
                            width="20px"
                            height="20px"
                            className="rounded-circle object-fit-cover round-20"
                          />
                        </div>
                        <p className="mb-0 fs-3">عربي (Arabic)</p>
                      </a>
                    </div>
                  </div>
                </li>
                {/* ------------------------------- */}
                {/* end language Dropdown */}
                {/* ------------------------------- */}
                {/* ------------------------------- */}
                {/* start profile Dropdown */}
                {/* ------------------------------- */}
                <li className="nav-item dropdown">
                  <a
                    className="nav-link"
                    href="javascript:void(0)"
                    id="drop1"
                    aria-expanded="false"
                  >
                    <div className="d-flex align-items-center gap-2 lh-base">
                      <img
                        src="../assets/images/profile/user-1.jpg"
                        className="rounded-circle"
                        width={35}
                        height={35}
                        alt="matdash-img"
                      />
                      <iconify-icon
                        icon="solar:alt-arrow-down-bold"
                        className="fs-2"
                      />
                    </div>
                  </a>
                  <div
                    className="dropdown-menu profile-dropdown dropdown-menu-end dropdown-menu-animate-up"
                    aria-labelledby="drop1"
                  >
                    <div className="position-relative px-4 pt-3 pb-2">
                      <div className="d-flex align-items-center mb-3 pb-3 border-bottom gap-6">
                        <img
                          src="../assets/images/profile/user-1.jpg"
                          className="rounded-circle"
                          width={56}
                          height={56}
                          alt="matdash-img"
                        />
                        <div>
                          <h5 className="mb-0 fs-12">
                            David McMichael{" "}
                            <span className="text-success fs-11">Pro</span>
                          </h5>
                          <p className="mb-0 text-dark">david@wrappixel.com</p>
                        </div>
                      </div>
                      <div className="message-body">
                        <a
                          href="javascript:void(0)"
                          className="p-2 dropdown-item h6 rounded-1"
                        >
                          My Profile
                        </a>
                        <a
                          href="javascript:void(0)"
                          className="p-2 dropdown-item h6 rounded-1"
                        >
                          My Subscription
                        </a>
                        <a
                          href="javascript:void(0)"
                          className="p-2 dropdown-item h6 rounded-1"
                        >
                          My Statements{" "}
                          <span className="badge bg-danger-subtle text-danger rounded ms-8">
                            4
                          </span>
                        </a>
                        <a
                          href="javascript:void(0)"
                          className="p-2 dropdown-item h6 rounded-1"
                        >
                          Account Settings
                        </a>
                        <a
                          href="../dark/authentication-login2.html"
                          className="p-2 dropdown-item h6 rounded-1"
                        >
                          Sign Out
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
                {/* ------------------------------- */}
                {/* end profile Dropdown */}
                {/* ------------------------------- */}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
