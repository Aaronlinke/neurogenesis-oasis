import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import DashboardLayout from "./components/DashboardLayout";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Analytics from "./pages/Analytics";
import Reports from "./pages/Reports";
import Logs from "./pages/Logs";
import Configuration from "./pages/Configuration";
import Users from "./pages/Users";
import Pricing from "./pages/Pricing";
import Subscription from "./pages/Subscription";
import APIKeys from "./pages/APIKeys";
import Affiliate from "./pages/Affiliate";
import Revenue from "./pages/Revenue";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/analytics"} component={Analytics} />
      <Route path={"/reports"} component={Reports} />
      <Route path={"/logs"} component={Logs} />
      <Route path={"/configuration"} component={Configuration} />
      <Route path={"/users"} component={Users} />
      <Route path={"/pricing"} component={Pricing} />
      <Route path={"/subscription"} component={Subscription} />
      <Route path={"/api-keys"} component={APIKeys} />
      <Route path={"/affiliate"} component={Affiliate} />
      <Route path={"/revenue"} component={Revenue} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <DashboardLayout>
            <Router />
          </DashboardLayout>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
