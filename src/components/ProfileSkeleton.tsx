export default function ProfileSkeleton() {
  return (
    <>
      {/* <div className="skeleton shrink-0 w-10 h-10 bg-gray-300 rounded-full"></div> */}
      <div className="relative w-10 h-10">
        <div className="absolute inset-0 rounded-full p-[2px] bg-gradient-to-tr from-primary via-secondary to-accent animate-spin-slow">
          <div className="h-full w-full rounded-full bg-base-200 skeleton"></div>
        </div>
      </div>
    </>
  )
}
