import Confessions from "@/components/confessions";
import BasicForm from "@/components/forms/basic";

function Home() {
  return (
    <div className="mt-5">
      <BasicForm />
      <Confessions />
    </div>
  );
}

export default Home;
