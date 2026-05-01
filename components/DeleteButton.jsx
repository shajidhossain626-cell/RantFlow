"use client";

export default function DeleteButton({ id }) {
  async function handleDelete() {
    const ok = confirm("Delete this optimization?");
    if (!ok) return;

    await fetch("/api/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    window.location.reload();
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-300 hover:bg-red-500/20"
    >
      Delete
    </button>
  );
}