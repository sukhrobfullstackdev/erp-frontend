import React, { lazy, Suspense } from "react";
import { BrowserRouter as WebRouter, Redirect, Route, Switch } from "react-router-dom";
import history from "./history";
import LayoutManager from "../layouts/LayoutManager";
import AuthLoader from "../services/auth/AuthLoader";
import IsAuth from "../services/auth/IsAuth";
import HasAccess from "../services/auth/HasAccess";
import { InitialLoader } from "../components/loader";
import IsGuest from "../services/auth/IsGuest";

// SALES MODULES
const LeadFormPage = lazy(() => import("../modules/sales/pages/lead/LeadFormPage"));
const SpecialPriceListPage = lazy(() => import("../modules/sales/pages/specialization-price/ListPage"));
const SalesListPage = lazy(() => import("../modules/sales/pages/sales/ListPage"));
const SalesLeadsListPage = lazy(() => import("../modules/sales/pages/lead/ListPage"));
const SalesInvoicesListPage = lazy(() => import("../modules/sales/pages/lead-invoices/ListPage"));
const SalesCallsListPage = lazy(() => import("../modules/sales/pages/calls/ListPage"));
const SalesAdmissionListPage = lazy(() => import("../modules/sales/pages/admission/ListPage"));
const SalesAdmissionOneListPage = lazy(() => import("../modules/sales/pages/admission-one/ListPage"));
const SalesGroupTypeListPage = lazy(() => import("../modules/sales/pages/group-type/ListPage"));
const SalesGroupListPage = lazy(() => import("../modules/sales/pages/group/ListPage"));
const SalesGroupOneListPage = lazy(() => import("../modules/sales/pages/group-one/ListPage"));
const OperatorsPage = lazy(() => import("../modules/sales/pages/operators/operatorsPage"));
const EventListPage = lazy(() => import("../modules/sales/pages/marketing/events/ListPage"));

// SETTINGS MODULES
const RoleCreatePage = lazy(() => import("../modules/settings/pages/role/CreatePage"));
const RoleUpdatePage = lazy(() => import("../modules/settings/pages/role/UpdatePage"));
const RoleCopyPage = lazy(() => import("../modules/settings/pages/role/CopyPage"));
const RoleListPage = lazy(() => import("../modules/settings/pages/role/ListPage"));
const ModuleListPage = lazy(() => import("../modules/settings/pages/module/ListPage"));
const LanguageListPage = lazy(() => import("../modules/settings/pages/language/ListPage"));
const LanguageKeysListPage = lazy(() => import("../modules/settings/pages/language/KeysPage"));
const LimitFileSize = lazy(() => import("../modules/settings/pages/limitFileSize/ListPage"));

// AUTH MODULES
const Components = lazy(() => import("../modules/auth/pages/Components"));
const SignUpPage = lazy(() => import("../modules/auth/pages/SignUpPage"));
const VerificationPage = lazy(() => import("../modules/auth/pages/VerificationPage"));
const VerificationMethodsPage = lazy(() => import("../modules/auth/pages/VerificationMethodsPage"));
const LoginOrSignUpPage = lazy(() => import("../modules/auth/pages/LoginOrSignUpPage"));
const SecretQuestionPage = lazy(() => import("../modules/auth/pages/SecretQuestionPage"));
const ForgotPhoneNumberPage = lazy(() => import("../modules/auth/pages/ForgotPhoneNumberPage"));
const TestPage = lazy(() => import("../modules/auth/pages/TestPage"));
const LoginPage = lazy(() => import("../modules/auth/pages/LoginPage"));
const NotFoundPage = lazy(() => import("../modules/auth/pages/NotFoundPage"));
const DefaultPage = lazy(() => import("../modules/auth/pages/DefaultPage"));
const TwoStepAuthenticationPage = lazy(() => import("../modules/auth/pages/TwoStepAuthenticationPage"));
const ResetPasswordPage = lazy(() => import("../modules/auth/pages/ResetPasswordPage"));

// ACADEMY MODULES
const AddAndEditSpecializationPage = lazy(() =>
  import("../modules/academy/pages/content/specialty/AddAndEditSpecializationPage")
);
const AcademyLessonTemplatePage = lazy(() => import("../modules/academy/pages/topic/ListPage"));
const Country = lazy(() => import("../modules/academy/pages/branch/country/countryPage"));
const Region = lazy(() => import("../modules/academy/pages/branch/region/regionPage"));
const Room = lazy(() => import("../modules/academy/pages/branch/room/roomPage"));
const Floor = lazy(() => import("../modules/academy/pages/branch/floor/floorPage"));
const Building = lazy(() => import("../modules/academy/pages/branch/building/buildingPage"));
const District = lazy(() => import("../modules/academy/pages/branch/district/districtPage"));
const Branch = lazy(() => import("../modules/academy/pages/branch/branch/branchPage"));
const Address = lazy(() => import("../modules/academy/pages/branch/address/addressPage"));
const AcademicGroupTypeSpecializationListPage = lazy(() =>
  import("../modules/academy/pages/content/group-type-lesson/CreatePage")
);
const SpecialtyContentListPage = lazy(() => import("../modules/academy/pages/content/specialty/ListPage"));
const ModuleContentListPage = lazy(() => import("../modules/academy/pages/content/module/ListPage"));
const TimeTable = lazy(() => import("../modules/academy/pages/timeTable/ListPage"));
const CourseContentListPage = lazy(() => import("../modules/academy/pages/content/course/ListPage"));

// HRM MODULES
const HrTableListPage = lazy(() => import("../modules/hr/pages/hr-table/ListPage"));
const HrTariffListPage = lazy(() => import("../modules/hr/pages/tariff/ListPage"));
const HrHolidaysListPage = lazy(() => import("../modules/hr/pages/holidays/ListPage"));
const HrIllnessListPage = lazy(() => import("../modules/hr/pages/illness/ListPage"));
const HrEmployeeCategoryPage = lazy(() => import("../modules/hr/pages/employee-category/ListPage"));
const HrEmployeeCategoryTypeListPage = lazy(() => import("../modules/hr/pages/employee-category-type/ListPage"));
const HrPositionListPage = lazy(() => import("../modules/hr/pages/position/ListPage"));
const HrDepartmentListPage = lazy(() => import("../modules/hr/pages/department/ListPage"));
const HrPrivilegeListPage = lazy(() => import("../modules/hr/pages/privilege-type/ListPage"));
const HrPhoneNumberTypePage = lazy(() => import("../modules/hr/pages/phone-number-type/ListPage"));
const HrCreateEmployeePage = lazy(() => import("../modules/hr/pages/employee/CreatePage"));
const TablePage = lazy(() => import("../modules/hr/pages/table/tablePage"));
const HrPage = lazy(() => import("../modules/hr/pages/hrPage"));
const ConfigPage = lazy(() => import("../modules/hr/pages/config/ConfigPage"));
const TimeSheetListPage = lazy(() => import("../modules/hr/pages/timeSheet/timeSheetListPage"));
const TimeSheetViewPage = lazy(() => import("../modules/hr/pages/timeSheet/timeSheetViewPage"));

// FINANCE MODULES
const ExpensePropositionPage = lazy(() => import("../modules/finance/pages/expenseProposition/ExpensePropositionPage"));
const ExpensesPage = lazy(() => import("../modules/finance/pages/expenses/ExpensesPage"));
const CashTransferPage = lazy(() => import("../modules/finance/pages/cashTransfer/cashTransferPage"));
const ExpensePropositionTypePage = lazy(() =>
  import("../modules/finance/pages/expensePropositionType/expensePropositionTypePage")
);
const PaymentTypePage = lazy(() => import("../modules/finance/pages/paymentType/paymentTypePage"));
const CashPage = lazy(() => import("../modules/finance/pages/cashPage/cashPage"));
const ExpensePropositionItemPage = lazy(() =>
  import("../modules/finance/pages/expensePropositionItem/ExpensePropositionItemPage")
);
const PayRollPage = lazy(() => import("../modules/finance/pages/payRoll/payRollPage"));
const SalaryPage = lazy(() => import("../modules/finance/pages/salary/salaryPage"));
const FinanceCostPage = lazy(() => import("../modules/finance/pages/cost/ListPage"));
const FinanceEmployeePage = lazy(() => import("../modules/finance/pages/employee/ListPage"));
const DashboardPage = lazy(() => import("../modules/finance/pages/dashboard/dashboardPage"));

// ACCOUNT MODULES
const AccountSettingsPage = lazy(() => import("../modules/account/pages/AccountSettingsPage"));

const Router = () => {
  return (
    <WebRouter history={history}>
      <AuthLoader>
        <LayoutManager>
          <Suspense fallback={<InitialLoader />}>
            <IsAuth>
              <HasAccess>
                {({ userCan, modules, departments, pages, permissions }) => (
                  <Switch>
                    <Route path={["/", "/components"]} exact component={Components} />

                    <Route path={"/setting/auth/modules"} exact render={(props) => <ModuleListPage {...props} />} />

                    <Route path={"/account"} exact render={(props) => <AccountSettingsPage {...props} />} />

                    <Route path={["/setting", "/setting/auth/roles"]} exact render={(props) => <RoleListPage {...props} />} />

                    <Route path={["/setting/auth/security-questions"]} exact render={(props) => <RoleListPage {...props} />} />

                    <Route path={"/setting/auth/languages"} exact render={(props) => <LanguageListPage {...props} />} />

                    <Route path={"/setting/auth/keys"} exact render={(props) => <LanguageKeysListPage {...props} />} />

                    <Route path={"/setting/auth/limit-file-size"} exact render={(props) => <LimitFileSize {...props} />} />

                    <Route path={"/role/create"} exact render={(props) => <RoleCreatePage {...props} />} />

                    <Route path={"/role/edit/:id"} exact render={(props) => <RoleUpdatePage {...props} />} />

                    <Route
                      path={["/sales/sales/admission", "/sales/sales/admission/:id"]}
                      exact
                      render={(props) => <SalesAdmissionListPage {...props} />}
                    />

                    <Route
                      path={["/sales/sales/admission", "/sales/sales/admission-one/:id"]}
                      exact
                      render={(props) => <SalesAdmissionOneListPage {...props} />}
                    />

                    <Route path={"/sales/sales/group-type"} exact render={(props) => <SalesGroupTypeListPage {...props} />} />

                    <Route
                      path={["/sales/sales/group", "/sales/sales/group/:id"]}
                      exact
                      render={(props) => <SalesGroupListPage {...props} />}
                    />

                    <Route
                      path={["/sales/sales/group", "/sales/sales/group-one/:id"]}
                      exact
                      render={(props) => <SalesGroupOneListPage {...props} />}
                    />

                    <Route
                      path={["/sales/sales/calls", "/sales/sales/calls/:id"]}
                      exact
                      render={(props) => <SalesCallsListPage {...props} />}
                    />

                    <Route
                      path={["/sales/sales/operators", "/sales/sales/operators/:id"]}
                      exact
                      render={(props) => <OperatorsPage {...props} />}
                    />

                    <Route path={"/sales/sales/invoices"} exact render={(props) => <SalesInvoicesListPage {...props} />} />

                    <Route
                      path={["/sales/sales/leads", "/sales/sales/leads/:id"]}
                      exact
                      render={(props) => <SalesLeadsListPage {...props} />}
                    />

                    <Route path={"/sales/marketing/events"} exact render={(props) => <EventListPage {...props} />} />

                    <Route path={"/sales"} exact render={(props) => <SalesListPage {...props} />} />

                    <Route path={"/hrm/company/privilege-type"} exact render={(props) => <HrPrivilegeListPage {...props} />} />

                    <Route
                      path={"/sales/sales/group-type-lesson"}
                      exact
                      render={(props) => <AcademicGroupTypeSpecializationListPage {...props} />}
                    />

                    <Route
                      path={"/sales/sales/specialization-price"}
                      exact
                      render={(props) => <SpecialPriceListPage {...props} />}
                    />

                    <Route path={"/hrm/company/departments"} exact render={(props) => <HrDepartmentListPage {...props} />} />

                    <Route path={"/hrm/company/positions"} exact render={(props) => <HrPositionListPage {...props} />} />

                    <Route
                      path={"/hrm/company/employee-category-type"}
                      exact
                      render={(props) => <HrEmployeeCategoryTypeListPage {...props} />}
                    />

                    <Route
                      path={"/hrm/company/employee-category"}
                      exact
                      render={(props) => <HrEmployeeCategoryPage {...props} />}
                    />

                    <Route path={"/hrm/company/tariff-grid"} exact render={(props) => <HrTariffListPage {...props} />} />

                    <Route path={"/hrm/company/holidays"} exact render={(props) => <HrHolidaysListPage {...props} />} />

                    <Route path={"/hrm/company/template-for-sick"} exact render={(props) => <HrIllnessListPage {...props} />} />

                    <Route path={"/hrm/company/employee/add"} exact render={(props) => <HrCreateEmployeePage {...props} />} />

                    <Route path={"/hrm/company/employee/:id"} exact render={(props) => <HrPage {...props} />} />

                    <Route path={"/hrm/company/employee/edit/:id"} exact render={(props) => <HrPage {...props} />} />

                    <Route path={"/hrm/phone-number-type"} exact render={(props) => <HrPhoneNumberTypePage {...props} />} />
                    <Route path={"/finance/finance/cost"} exact render={(props) => <FinanceCostPage {...props} />} />

                    <Route path={"/finance/finance/employee/:id"} exact render={(props) => <FinanceEmployeePage {...props} />} />

                    <Route path={"/hrm/table"} exact render={(props) => <TablePage {...props} />} />

                    <Route
                      path={["/hrm/company/employees", "/hrm/company/employees/:id"]}
                      exact
                      render={(props) => <HrTableListPage {...props} />}
                    />

                    <Route path={"/hrm/tariff/list"} exact render={(props) => <HrTariffListPage {...props} />} />

                    <Route path={"/hrm/company/timesheet"} exact render={(props) => <TimeSheetListPage {...props} />} />

                    <Route
                      path={["/hrm/company/timesheet/view", "/hrm/company/timesheet/view/:id"]}
                      exact
                      render={(props) => <TimeSheetViewPage {...props} />}
                    />

                    <Route
                      path={"/academic/academic-content/module"}
                      exact
                      render={(props) => <ModuleContentListPage {...props} />}
                    />

                    <Route
                      path={"/academic/content/specialty"}
                      exact
                      render={(props) => <SpecialtyContentListPage {...props} />}
                    />

                    <Route
                      path={"/academic/academic-content/module"}
                      exact
                      render={(props) => <ModuleContentListPage {...props} />}
                    />

                    <Route
                      path={"/academic/content/specialty"}
                      exact
                      render={(props) => <SpecialtyContentListPage {...props} />}
                    />

                    <Route
                      path={"/academic/academic-content/lesson-plan"}
                      exact
                      render={(props) => <AcademicGroupTypeSpecializationListPage {...props} />}
                    />

                    <Route
                      path={"/academic/academic-content/lesson"}
                      exact
                      render={(props) => <AcademyLessonTemplatePage {...props} />}
                    />

                    <Route
                      path={"/academic/academic-content/course"}
                      exact
                      render={(props) => <CourseContentListPage {...props} />}
                    />

                    <Route
                      path={"/academic/academic-content/module"}
                      exact
                      render={(props) => <ModuleContentListPage {...props} />}
                    />
                    <Route
                      path={[
                        "/academic/academic-content/time-table",
                        "/academic/academic-content/time-table/:id",
                        "/academic/academic-content/time-table/:id/:timeTableId",
                        "/academic/academic-content/time-table/:id/:timeTableId/:tabIndex",
                        "/academic/academic-content/time-table/:id/:timeTableId/:tabIndex/:cardId",
                      ]}
                      exact
                      render={(props) => <TimeTable {...props} />}
                    />

                    <Route
                      path={"/academic/academic-content/specialization"}
                      exact
                      render={(props) => <SpecialtyContentListPage {...props} />}
                    />

                    <Route
                      path={"/academic/academic-content/specialization/add"}
                      exact
                      render={(props) => <AddAndEditSpecializationPage {...props} />}
                    />

                    <Route
                      path={"/academic/academic-content/specialization/edit/:id"}
                      exact
                      render={(props) => <AddAndEditSpecializationPage {...props} />}
                    />

                    <Route path={"/academic/branch/country"} exact render={(props) => <Country {...props} />} />

                    <Route path={"/academic/branch/region"} exact render={(props) => <Region {...props} />} />

                    <Route path={"/academic/branch/room"} exact render={(props) => <Room {...props} />} />
                    <Route path={"/academic/branch/address"} exact render={(props) => <Address {...props} />} />
                    <Route path={"/academic/branch/floor"} exact render={(props) => <Floor {...props} />} />
                    <Route path={"/academic/branch/building"} exact render={(props) => <Building {...props} />} />
                    <Route path={"/academic/branch/district"} exact render={(props) => <District {...props} />} />

                    <Route path={"/academic/branch/branch"} exact render={(props) => <Branch {...props} />} />

                    <Route path={"/sales/sales/lead/edit/:id"} exact render={(props) => <LeadFormPage {...props} />} />

                    <Route path={"/sales/sales/lead/add"} exact render={(props) => <LeadFormPage {...props} />} />

                    <Route path={"/sales/sales/lead/view/:id"} exact render={(props) => <LeadFormPage {...props} />} />

                    <Route
                      path={["/finance/finance/expense-proposition", "/finance/finance/expense-proposition/:id"]}
                      exact
                      render={(props) => <ExpensePropositionPage {...props} />}
                    />
                    <Route
                      path={["/finance/finance/expenses", "/finance/finance/expenses/:id"]}
                      exact
                      render={(props) => <ExpensesPage {...props} />}
                    />
                    <Route
                      path={["/finance/finance/cash-transfer", "/finance/finance/cash-transfer/:id"]}
                      exact
                      render={(props) => <CashTransferPage {...props} />}
                    />

                    <Route
                      path={"/finance/finance/type-of-expense-proposition"}
                      exact
                      render={(props) => <ExpensePropositionTypePage {...props} />}
                    />

                    <Route path={"/finance/finance/type-of-payments"} exact render={(props) => <PaymentTypePage {...props} />} />

                    <Route path={"/finance/finance/cash"} exact render={(props) => <CashPage {...props} />} />

                    <Route
                      path={"/finance/finance/expense-proposition-item/create"}
                      exact
                      render={(props) => <ExpensePropositionItemPage {...props} />}
                    />

                    <Route
                      path={"/finance/finance/expense-proposition-item/:id"}
                      exact
                      render={(props) => <ExpensePropositionItemPage {...props} />}
                    />

                    <Route
                      path={"/finance/finance/expense-proposition-item/edit/:id"}
                      exact
                      render={(props) => <ExpensePropositionItemPage {...props} />}
                    />

                    <Route path={"/finance/finance/payroll"} exact render={(props) => <PayRollPage {...props} />} />

                    <Route path={"/finance/finance/salary"} exact render={(props) => <SalaryPage {...props} />} />

                    <Route path={"/finance/finance/dashboard"} exact render={(props) => <DashboardPage {...props} />} />

                    <Route path={"/hrm/company/config"} exact render={(props) => <ConfigPage {...props} />} />

                    <Route path={"/default"} exact render={(props) => <DefaultPage {...props} />} />

                    <Route path={"/test"} exact component={TestPage} />

                    <Route path={"/404"} exact component={NotFoundPage} />

                    <Redirect to={"/404"} />
                  </Switch>
                )}
              </HasAccess>
            </IsAuth>
            <IsGuest>
              <Switch>
                <Route path={"/auth"} exact component={LoginOrSignUpPage} />

                <Route path={"/auth/sign-up/:phone"} exact component={SignUpPage} />

                <Route path={"/auth/verification/:phone/:smsCodeId/:message/:options/:type"} exact component={VerificationPage} />

                <Route
                  path={"/auth/two-step-authentication/:phone/:options/:type/:hint/:smsCode/:smsId"}
                  exact
                  component={TwoStepAuthenticationPage}
                />

                <Route
                  path={"/auth/reset-password/:phone/:options/:type/:hint/:smsCode/:smsId"}
                  exact
                  component={ResetPasswordPage}
                />

                <Route
                  path={"/auth/secret-question/:phone/:options/:question/:page/:type"}
                  exact
                  component={SecretQuestionPage}
                />

                <Route
                  path={["/auth/forgot-phone-number", "/auth/forgot-phone-number/:email"]}
                  exact
                  component={ForgotPhoneNumberPage}
                />

                <Route path={"/auth/verification-methods/:phone/:options/:type"} exact component={VerificationMethodsPage} />

                <Route path={"/auth/login/:phone"} exact component={LoginPage} />

                <Route path={"/test"} exact component={TestPage} />

                <Route path={"/components"} exact component={Components} />

                <Redirect to={"/auth"} />
              </Switch>
            </IsGuest>
          </Suspense>
        </LayoutManager>
      </AuthLoader>
    </WebRouter>
  );
};

export default Router;
