"use client";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: Props) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const visible = pages.filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 2
  );

  const withEllipsis: (number | "...")[] = [];
  visible.forEach((p, i) => {
    if (i > 0 && typeof visible[i - 1] === "number" && p - (visible[i - 1] as number) > 1) {
      withEllipsis.push("...");
    }
    withEllipsis.push(p);
  });

  const baseBtn = "px-3 py-1.5 rounded border text-sm cursor-pointer";

  return (
    <nav className="flex justify-center items-center gap-1.5 mt-4 flex-wrap" aria-label="Paginação">
      <span className="text-xs text-gray-500 mr-2">
        Página {currentPage} de {totalPages}
      </span>

      <button
        className={`${baseBtn} ${currentPage === 1 ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed" : "border-gray-300 bg-white hover:bg-gray-50"}`}
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ‹ Anterior
      </button>

      {withEllipsis.map((p, i) =>
        p === "..." ? (
          <span key={`e-${i}`} className="text-gray-400 text-sm px-1">…</span>
        ) : (
          <button
            key={p}
            className={`${baseBtn} ${p === currentPage ? "bg-navy border-navy text-white font-semibold" : "border-gray-300 bg-white hover:bg-gray-50"}`}
            onClick={() => onPageChange(p as number)}
            aria-current={p === currentPage ? "page" : undefined}
          >
            {p}
          </button>
        )
      )}

      <button
        className={`${baseBtn} ${currentPage === totalPages ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed" : "border-gray-300 bg-white hover:bg-gray-50"}`}
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Próxima ›
      </button>
    </nav>
  );
}
