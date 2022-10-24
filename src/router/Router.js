import React from "react";
import { BrowserRouter as WebRouter, Redirect, Route, Switch } from "react-router-dom";
import history from "./history";
import LayoutManager from "../layouts/LayoutManager";
import AuthLoader from "../services/auth/AuthLoader";
import IsAuth from "../services/auth/IsAuth";
import HasAccess from "../services/auth/HasAccess";
// import { InitialLoader } from "../components/loader";
import IsGuest from "../services/auth/IsGuest";

// SALES MODULES
import LeadFormPage from "../modules/sales/pages/lead/LeadFormPage";

import SpecialPriceListPage from "../modules/sales/pages/specialization-price/ListPage";
import SpecialDiscountListPage from "../modules/sales/pages/specialization-discount/ListPage";
import SalesListPage from "../modules/sales/pages/sales/ListPage";
import SalesLeadsListPage from "../modules/sales/pages/lead/ListPage";
import SalesInvoicesListPage from "../modules/sales/pages/lead-invoices/ListPage";
import SalesCallsListPage from "../modules/sales/pages/calls/ListPage";
import SalesAdmissionListPage from "../modules/sales/pages/admission/ListPage";
import SalesAdmissionOneListPage from "../modules/sales/pages/admission-one/ListPage";
import SalesGroupTypeListPage from "../modules/sales/pages/group-type/ListPage";
import SalesGroupListPage from "../modules/sales/pages/group/ListPage";
import SalesGroupOneListPage from "../modules/sales/pages/group-one/ListPage";
import OperatorsPage from "../modules/sales/pages/operators/operatorsPage";
import EventListPage from "../modules/sales/pages/marketing/events/ListPage";
import LeadInvoiecs from "../modules/sales/pages/lead-invoices/ListPage";
import LeadInvoiceOnePage from "../modules/sales/pages/invoices-one/InvoicesOnePage";

// SETTINGS MODULES
import RoleCreatePage from "../modules/settings/pages/role/CreatePage";
import RoleUpdatePage from "../modules/settings/pages/role/UpdatePage";
import RoleCopyPage from "../modules/settings/pages/role/CopyPage";
import RoleListPage from "../modules/settings/pages/role/ListPage";
import ModuleListPage from "../modules/settings/pages/module/ListPage";
import LanguageListPage from "../modules/settings/pages/language/ListPage";
import LanguageKeysListPage from "../modules/settings/pages/language/KeysPage";
import LimitFileSize from "../modules/settings/pages/limitFileSize/ListPage";

// AUTH MODULES
import Components from "../modules/auth/pages/Components";
import SignUpPage from "../modules/auth/pages/SignUpPage";
import VerificationPage from "../modules/auth/pages/VerificationPage";
import VerificationMethodsPage from "../modules/auth/pages/VerificationMethodsPage";
import LoginOrSignUpPage from "../modules/auth/pages/LoginOrSignUpPage";
import SecretQuestionPage from "../modules/auth/pages/SecretQuestionPage";
import ForgotPhoneNumberPage from "../modules/auth/pages/ForgotPhoneNumberPage";
import TestPage from "../modules/auth/pages/TestPage";
import LoginPage from "../modules/auth/pages/LoginPage";
import NotFoundPage from "../modules/auth/pages/NotFoundPage";
import DefaultPage from "../modules/auth/pages/DefaultPage";
import TwoStepAuthenticationPage from "../modules/auth/pages/TwoStepAuthenticationPage";
import ResetPasswordPage from "../modules/auth/pages/ResetPasswordPage";

// ACADEMY MODULES
import AddAndEditSpecializationPage from "../modules/academy/pages/content/specialty/AddAndEditSpecializationPage";
import AcademyLessonTemplatePage from "../modules/academy/pages/topic/ListPage";
import Country from "../modules/academy/pages/branch/country/countryPage";
import Region from "../modules/academy/pages/branch/region/regionPage";
import Room from "../modules/academy/pages/branch/room/roomPage";
import Floor from "../modules/academy/pages/branch/floor/floorPage";
import Building from "../modules/academy/pages/branch/building/buildingPage";
import District from "../modules/academy/pages/branch/district/districtPage";
import Branch from "../modules/academy/pages/branch/branch/branchPage";
import Address from "../modules/academy/pages/branch/address/addressPage";
import AcademicGroupTypeSpecializationListPage from "../modules/academy/pages/content/group-type-lesson/CreatePage";
import SpecialtyContentListPage from "../modules/academy/pages/content/specialty/ListPage";
import ModuleContentListPage from "../modules/academy/pages/content/module/ListPage";
import TimeTable from "../modules/academy/pages/timeTable/ListPage";
import CourseContentListPage from "../modules/academy/pages/content/course/ListPage";

// HRM MODULES
import HrTableListPage from "../modules/hr/pages/hr-table/ListPage";
import HrTariffListPage from "../modules/hr/pages/tariff/ListPage";
import HrHolidaysListPage from "../modules/hr/pages/holidays/ListPage";
import HrIllnessListPage from "../modules/hr/pages/illness/ListPage";
import HrEmployeeCategoryPage from "../modules/hr/pages/employee-category/ListPage";
import HrEmployeeCategoryTypeListPage from "../modules/hr/pages/employee-category-type/ListPage";
import HrPositionListPage from "../modules/hr/pages/position/ListPage";
import HrDepartmentListPage from "../modules/hr/pages/department/ListPage";
import HrPrivilegeListPage from "../modules/hr/pages/privilege-type/ListPage";
import HrPhoneNumberTypePage from "../modules/hr/pages/phone-number-type/ListPage";
import HrCreateEmployeePage from "../modules/hr/pages/employee/CreatePage";
import TablePage from "../modules/hr/pages/table/tablePage";
import HrPage from "../modules/hr/pages/hrPage";
import ConfigPage from "../modules/hr/pages/config/ConfigPage";
import TimeSheetListPage from "../modules/hr/pages/timeSheet/timeSheetListPage";
import TimeSheetViewPage from "../modules/hr/pages/timeSheet/timeSheetViewPage";

// FINANCE MODULES
import ExpensePropositionPage from "../modules/finance/pages/expenseProposition/ExpensePropositionPage";
import ExpensesPage from "../modules/finance/pages/expenses/ExpensesPage";
import CashTransferPage from "../modules/finance/pages/cashTransfer/cashTransferPage";
import ExpensePropositionTypePage from "../modules/finance/pages/expensePropositionType/expensePropositionTypePage";
import PaymentTypePage from "../modules/finance/pages/paymentType/paymentTypePage";
import CashPage from "../modules/finance/pages/cashPage/cashPage";
import ExpensePropositionItemPage from "../modules/finance/pages/expensePropositionItem/ExpensePropositionItemPage";
import PayRollPage from "../modules/finance/pages/payRoll/payRollPage";
import SalaryPage from "../modules/finance/pages/salary/salaryPage";
import FinanceCostPage from "../modules/finance/pages/cost/ListPage";
import FinanceEmployeePage from "../modules/finance/pages/employee/ListPage";
import DashboardPage from "../modules/finance/pages/dashboard/dashboardPage";
import DebtorStudentsPage from "../modules/finance/pages/debtor-students/ListPage";
import DebtorStudentsOnePage from "../modules/finance/pages/debtor-students-one/DebtorStudentsOnePage";
import PaymentsPage from "../modules/finance/pages/payments/paymentsPage";

// ACCOUNT MODULES
import AccountSettingsPage from "../modules/account/pages/AccountSettingsPage";
import InvoiceStatus from "modules/sales/pages/invoice-status";

const Router = () => {
  return (
    <WebRouter history={history}>
      <AuthLoader>
        <LayoutManager>
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

                  <Route
                    path={["/setting/auth/keys", "/setting/auth/keys/:id"]}
                    exact
                    render={(props) => <LanguageKeysListPage {...props} />}
                  />

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

                  <Route path={"/sales/sales/lead-invoice"} exact render={(props) => <SalesInvoicesListPage {...props} />} />

                  <Route
                    path={["/sales/sales/leads", "/sales/sales/leads/:id"]}
                    exact
                    render={(props) => <SalesLeadsListPage {...props} />}
                  />

                  <Route
                    path={["/sales/sales/lead-invoice", "/sales/sales/lead-invoice/:id"]}
                    exact
                    render={(props) => <LeadInvoiecs {...props} />}
                  />

                  <Route path={"/sales/sales/lead-invoice-one/:id"} exact render={(props) => <LeadInvoiceOnePage {...props} />} />

                  <Route path={"/sales/sales/invoice-status"} exact render={(props) => <InvoiceStatus {...props} />} />

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

                  <Route
                    path={"/sales/sales/specialization-discount"}
                    exact
                    render={(props) => <SpecialDiscountListPage {...props} />}
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

                  <Route path={"/academic/content/specialty"} exact render={(props) => <SpecialtyContentListPage {...props} />} />

                  <Route
                    path={"/academic/academic-content/module"}
                    exact
                    render={(props) => <ModuleContentListPage {...props} />}
                  />

                  <Route path={"/academic/content/specialty"} exact render={(props) => <SpecialtyContentListPage {...props} />} />

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

                  <Route
                    path={["/sales/sales/lead/edit/:id", "/sales/sales/lead/edit/:id/:rowId"]}
                    exact
                    render={(props) => <LeadFormPage {...props} />}
                  />

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

                  <Route
                    path={["/finance/finance/debtor-students", "/finance/finance/debtor-students/:id"]}
                    exact
                    render={(props) => <DebtorStudentsPage {...props} />}
                  />

                  <Route
                    path={["/finance/finance/payments", "/finance/finance/payments/:id"]}
                    exact
                    render={(props) => <PaymentsPage {...props} />}
                  />

                  <Route
                    path={"/finance/finance/debtor-students-one/:id"}
                    exact
                    render={(props) => <DebtorStudentsOnePage {...props} />}
                  />

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

              <Route path={["/auth/sign-up/:phone", "/auth/sign-up/:phone/:hasPassword"]} exact component={SignUpPage} />

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

              <Route path={"/auth/secret-question/:phone/:options/:question/:page/:type"} exact component={SecretQuestionPage} />

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
        </LayoutManager>
      </AuthLoader>
    </WebRouter>
  );
};

export default Router;
