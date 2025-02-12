"use client";

interface PaymentInfoProps {
  payment?: { // Make it optional
    method: string;
    businessName: string;
    phone: string;
  };
}

const PaymentInfo: React.FC<PaymentInfoProps> = ({ 
  payment = { 
    method: "Not Available", 
    businessName: "Not Available", 
    phone: "Not Available" 
  } 
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
     
      <p><strong>Method:</strong> {payment?.method || "Not Available"}</p> {/* Prevents undefined error */}
      <p><strong>Business Name:</strong> {payment?.businessName || "Not Available"}</p>
      <p><strong>Phone:</strong> {payment?.phone || "Not Available"}</p>
    </div>
  );
};

export default PaymentInfo;
