import Layout from "../components/Layout";

export default function OrderOfTheDay() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-start bg-gradient-to-b from-[#fff8f0] via-[#fffbe9] to-[#f9e7e7] px-4 pt-16 pb-8 min-h-screen">
        {/* Hanging sign */}
        <div className="mb-6">
          <img
            src="/assets/RunOfTheDayFixed.jpg"
            alt="Order of the Day"
            className="mx-auto w-200 drop-shadow-lg"
          />
        </div>
      
      </div>
    </Layout>
  );
}
