import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { Eye } from "lucide-react"; // Import Eye icon for "View Details"
import "./TenderTable.css";

const TenderTable = ({
  tenders,
  state = "",
  district = "",
  organization = "",
}) => {
  const navigate = useNavigate();
  const [exchangeRate, setExchangeRate] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: "price",
    direction: "desc",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        setExchangeRate(0.012);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
        setLoading(false);
      }
    };
    fetchExchangeRate();
  }, []);

  const parseCurrency = (priceStr) => {
    if (!priceStr || priceStr === "N/A") return null;
    const value = parseFloat(priceStr.replace(/[₹,\s]/g, "")) || 0;
    return value === 0 ? null : value;
  };

  const formatCurrency = (amount, currency = "INR") => {
    if (amount === null || isNaN(amount) || amount === 0) return "N/A";

    const formatter = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currency,
      maximumFractionDigits: 2,
    });

    return formatter.format(amount);
  };

  const convertToUSD = (inrAmount) => {
    if (!exchangeRate || !inrAmount) return null;
    return inrAmount * exchangeRate;
  };

  const handleSort = (key) => {
    setSortConfig((prevConfig) => ({
      key,
      direction:
        prevConfig.key === key
          ? prevConfig.direction === "asc"
            ? "desc"
            : "asc"
          : "asc",
    }));
  };

  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey)
      return <ArrowUpDown className="w-4 h-4 text-gray-300" />;
    return sortConfig.direction === "asc" ? (
      <ArrowUp className="w-4 h-4 text-white" />
    ) : (
      <ArrowDown className="w-4 h-4 text-white" />
    );
  };

  const sortTenders = (tenders) => {
    const sortedTenders = [...tenders].sort((a, b) => {
      const compareWithNA = (valA, valB, asc = true) => {
        if (valA === null && valB === null) return 0;
        if (valA === null) return 1;
        if (valB === null) return -1;
        return asc ? valA - valB : valB - valA;
      };

      switch (sortConfig.key) {
        case "price": {
          const priceA = parseCurrency(a.price);
          const priceB = parseCurrency(b.price);
          return compareWithNA(priceA, priceB, sortConfig.direction === "asc");
        }

        case "closing_date": {
          const dateA = new Date(a.closing_date).getTime();
          const dateB = new Date(b.closing_date).getTime();
          return sortConfig.direction === "asc" ? dateA - dateB : dateB - dateA;
        }

        case "tender_id":
          return sortConfig.direction === "asc"
            ? a.tender_id.localeCompare(b.tender_id)
            : b.tender_id.localeCompare(a.tender_id);

        case "title":
          return sortConfig.direction === "asc"
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title);

        default:
          return 0;
      }
    });

    return sortedTenders;
  };

  const filteredTenders = tenders.filter(
    (tender) =>
      (tender.state?.toLowerCase().includes(state.toLowerCase()) ||
        state === "") &&
      (tender.district?.toLowerCase().includes(district.toLowerCase()) ||
        district === "") &&
      (tender.organization
        ?.toLowerCase()
        .includes(organization.toLowerCase()) ||
        organization === "")
  );

  const sortedAndFilteredTenders = sortTenders(filteredTenders);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500">
        <div className="animate-pulse">Loading tender data...</div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-lg border border-gray-200">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left p-1 table-bordered border-primary">
          <thead className="bg-primary text-white text-center">
            <tr>
              <th
                className="px-6 py-4 cursor-pointer hover:bg-gray-800 transition-colors duration-200"
                onClick={() => handleSort("tender_id")}
              >
                <div className="flex items-center gap-2 font-semibold text-lg">
                  Tender ID
                  {getSortIcon("tender_id")}
                </div>
              </th>
              <th
                className="px-6 py-4 cursor-pointer hover:bg-gray-800 transition-colors duration-200"
                onClick={() => handleSort("title")}
              >
                <div className="flex items-center gap-2 font-semibold text-lg">
                  Title
                  {getSortIcon("title")}
                </div>
              </th>
              <th
                className="px-6 py-4 cursor-pointer hover:bg-gray-800 transition-colors duration-200"
                onClick={() => handleSort("price")}
              >
                <div className="flex items-center gap-2 font-semibold text-lg">
                  Price
                  {getSortIcon("price")}
                </div>
              </th>
              <th
                className="px-6 py-4 cursor-pointer hover:bg-gray-800 transition-colors duration-200"
                onClick={() => handleSort("closing_date")}
              >
                <div className="flex items-center gap-2 font-semibold text-lg">
                  Closing Date
                  {getSortIcon("closing_date")}
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedAndFilteredTenders.map((tender, index) => {
              const inrPrice = parseCurrency(tender.price);
              const usdPrice = convertToUSD(inrPrice);

              return (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 text-base font-medium text-gray-900">
                    {tender.tender_id}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex flex-col">
                        <span className="text-blue-500 text-base font-medium">
                          {tender.title}
                        </span>
                        <button
                          onClick={() =>
                            navigate("/tender-detail", { state: { tender } })
                          }
                          className="text-blue-400 hover:text-blue-600 text-sm mt-1 transition-colors duration-200 border border-blue-500 rounded-md px-2 py-1"
                        >
                          <Eye className="inline w-4 h-4 mr-1 text-blue-500" />
                          View Details
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-base font-medium">
                      {formatCurrency(inrPrice)}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-base text-gray-700">
                    {new Date(tender.closing_date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {sortedAndFilteredTenders.length === 0 && (
        <div className="text-center py-8 text-gray-500 text-lg">
          No tenders found matching your criteria
        </div>
      )}
    </div>
  );
};

export default TenderTable;
