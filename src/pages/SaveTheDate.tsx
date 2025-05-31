import EmailModal from "../components/EmailModal";
import Layout from "../components/Layout";

export default function SaveTheDate() {
  return (
    <Layout>
      <div style={{ textAlign: "center", marginTop: "10vh" }}>
        <img src="/assets/save-the-date.jpeg" />
        <div className="space-y-4" style={{ paddingBottom: "2em" }}>
          <br/>
          <EmailModal />
        </div>
      </div>
    </Layout>
  );
}
