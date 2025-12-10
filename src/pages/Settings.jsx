import SettingsComponent from "../components/setting/Settings";
import PageHeader from "../layout/PageHeader";

export default function Settings() {
  return(
  <>
    <PageHeader title="Settings" showBackArrow={false} />
    <SettingsComponent />;
  </>
)
}

