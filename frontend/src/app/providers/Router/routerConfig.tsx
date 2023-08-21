import { RouteProps } from "react-router";
import { MainPage } from "src/pages/MainPage";
import { NotFoundPage } from "src/pages/NotFoundPage";
import { ReportPage } from "src/pages/ReportPage";
import { SignInPage } from "src/pages/SignInPage/ui/SignInPage";
import { SummaryPage } from "src/pages/SummaryPage";
import { ExpensesPage } from "src/pages/ExpensesPage";
import { FilesPage } from "src/pages/FilesPage/ui/FilesPage";
import { BonusPage } from "src/pages/BonusPage/ui/BonusPage";

export enum AppRoutes {
  MAIN = "MAIN",
  REPORTS = "REPORTS",
  SUMMARY = "SUMMARY",
  NOT_FOUND = "NOT_FOUND",
  EXPENSES = "EXPENSES",
  FILES = "FILES",
  BONUSES = "BONUSES",
}
export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: "/",
  [AppRoutes.REPORTS]: "/reports",
  [AppRoutes.SUMMARY]: "/summary",
  [AppRoutes.EXPENSES]: "/expenses",
  [AppRoutes.FILES]: "/files",
  [AppRoutes.BONUSES]: "/bonuses",
  [AppRoutes.NOT_FOUND]: "*",
};

export const routeConfigPrivate: Record<AppRoutes, RouteProps> = {
  [AppRoutes.MAIN]: {
    path: RoutePath.MAIN,
    element: <MainPage />,
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.NOT_FOUND,
    element: <NotFoundPage />,
  },
  [AppRoutes.REPORTS]: {
    path: RoutePath.REPORTS,
    element: <ReportPage />,
  },
  [AppRoutes.SUMMARY]: {
    path: RoutePath.SUMMARY,
    element: <SummaryPage />,
  },
  [AppRoutes.EXPENSES]: {
    path: RoutePath.EXPENSES,
    element: <ExpensesPage />,
  },
  [AppRoutes.FILES]: {
    path: RoutePath.FILES,
    element: <FilesPage />,
  },
  [AppRoutes.BONUSES]: {
    path: RoutePath.BONUSES,
    element: <BonusPage />,
  },
};

export const routeConfigPublic = {
  [AppRoutes.MAIN]: {
    path: RoutePath.MAIN,
    element: <SignInPage />,
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.NOT_FOUND,
    element: <NotFoundPage />,
  },
};