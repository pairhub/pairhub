export default function GetStarted({ user }) {
  return (
    <>
      <div className="bg-white border-b">
        <div className=" max-w-screen-lg mx-auto px-4 py-14 space-y-10">
          <div className="space-y-4">
            <h1 className="text-3xl max-w-xl font-bold">Get started</h1>

            <p className="text-gray-600">
              Create a profile to get automatic match suggestions
            </p>
          </div>
        </div>
      </div>
      <div className=" max-w-screen-sm  mx-auto px-4 py-14 space-y-10">
        <div className="bg-white shadow border p-6 rounded-md ">
          <div>
            <div>{user?.name}</div>
          </div>
        </div>
        {/* <h1 className="text-lg text-gray-600">Coming soon...</h1> */}
      </div>
    </>
  );
}
