import Papa from "papaparse";

export const downloadCSV = (data: any[], fileName: string) => {
  const csv = Papa.unparse(data);
  const blob = new Blob([csv], { type: "text/csv" });
  downloadedBlob(blob, fileName);
};

export const downloadedBlob = (data: Blob, fileName: string) => {
  const url = URL.createObjectURL(data);
  downloadFile(url, fileName);
  setTimeout(() => URL.revokeObjectURL(url));
};

export const downloadFile = (URL: string, fileName: string) => {
  const link: any = document.createElement("a");
  link.href = URL;
  link.setAttribute("download", fileName);
  link.setAttribute("id", "remove-from-node");
  document.body.appendChild(link);
  link.click();
  return link;
};
