import Container from "@/components/container/container";
import Typography from "@/ui/designSystem/typography/typography";

export default function ShopLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-6 md:py-8 lg:py-12">
      <Container>
        <div className="mb-6 md:mb-8">
          <div className="h-10 bg-gray-200 rounded w-64 mb-4 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-96 mb-6 animate-pulse"></div>
          <div className="h-12 bg-gray-200 rounded max-w-2xl animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
          <aside className="lg:col-span-1">
            <div className="bg-white p-4 md:p-6 shadow-lg rounded-xl">
              <div className="h-6 bg-gray-200 rounded w-32 mb-4 animate-pulse"></div>
              <div className="space-y-4">
                <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </aside>
          <main className="lg:col-span-3">
            <div className="bg-white p-4 md:p-6 rounded-xl shadow-md mb-6">
              <div className="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white shadow-md rounded overflow-hidden animate-pulse">
                  <div className="h-64 bg-gray-200"></div>
                  <div className="p-5 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                    <div className="h-6 bg-gray-200 rounded w-full"></div>
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-8 bg-gray-200 rounded w-24"></div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </Container>
    </div>
  );
}

