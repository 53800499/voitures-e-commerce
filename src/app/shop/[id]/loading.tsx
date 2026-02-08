import Container from "@/components/container/container";
import Typography from "@/ui/designSystem/typography/typography";

export default function ProductDetailLoading() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Container>
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
            <span>/</span>
            <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
            <span>/</span>
            <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-16">
          {/* Galerie d'images */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="grid grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-square bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
          </div>
          {/* Informations produit */}
          <div className="space-y-6">
            <div>
              <div className="h-4 bg-gray-200 rounded w-24 mb-2 animate-pulse"></div>
              <div className="h-10 bg-gray-200 rounded w-full mb-4 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
            </div>
            <div className="h-12 bg-gray-200 rounded w-48 animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            </div>
            <div className="space-y-3">
              <div className="h-6 bg-gray-200 rounded w-24 animate-pulse"></div>
              <div className="flex gap-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-12 h-12 bg-gray-200 rounded animate-pulse"></div>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-6 bg-gray-200 rounded w-20 animate-pulse"></div>
              <div className="flex gap-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-10 w-12 bg-gray-200 rounded animate-pulse"></div>
                ))}
              </div>
            </div>
            <div className="flex gap-4 pt-4">
              <div className="h-12 bg-gray-200 rounded flex-1 animate-pulse"></div>
              <div className="h-12 bg-gray-200 rounded flex-1 animate-pulse"></div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

