"use client";

export default function QualityCertificate() {
  return (
    <div className="relative w-full h-full bg-white p-5 font-sans text-[#1a1a1a]" style={{
      boxShadow: 'inset 0 0 30px rgba(0,0,0,0.03)'
    }}>
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-[13px] font-bold tracking-wide text-[#1a365d] leading-tight mb-1">
          QUALITY MANAGEMENT SYSTEM
        </h1>
        <h2 className="text-[13px] font-bold tracking-wide text-[#1a365d]">
          CERTIFICATE
        </h2>
      </div>

      {/* Certification Body */}
      <div className="text-center mb-3">
        <p className="text-[8px] text-gray-600 italic">Nepal Quality Assurance</p>
        <p className="text-[8px] text-gray-600 italic">Certification Services</p>
      </div>

      {/* Grant Statement */}
      <p className="text-center text-[8px] text-gray-700 mb-3">
        This certificate is granted to the organization,
      </p>

      {/* Organization Name */}
      <div className="text-center mb-2">
        <h3 className="text-[11px] font-bold text-[#1a1a1a]">
          Seetara Global
        </h3>
      </div>

      {/* Address */}
      <p className="text-center text-[8px] text-gray-700 mb-3">
        Ward No. 26, Ranibari, Kathmandu Metropolitan City, Nepal
      </p>

      {/* Scope Review */}
      <p className="text-center text-[7px] text-gray-600 mb-2">
        by review of QA/2024/00847 numbered report for the scope
      </p>

      {/* Scope Items */}
      <div className="text-[6.5px] text-gray-700 mb-3 px-2 space-y-1">
        <p>
          <span className="font-semibold">1.</span> Manufacturing and quality control of handcrafted bags, accessories, and fashion goods using quality materials.
        </p>
        <p>
          <span className="font-semibold">2.</span> Quality inspection of raw materials, production processes, and finished products to ensure durability and craftsmanship standards.
        </p>
        <p>
          <span className="font-semibold">3.</span> Compliance with handcraft excellence guidelines and quality standards as per industry norms.
        </p>
      </div>

      {/* Certification Statement */}
      <p className="text-center text-[7px] text-gray-700 mb-2 px-2">
        to certify that a quality management system in accordance with standard clauses is established and being implemented
      </p>

      {/* Standard */}
      <div className="text-center mb-3">
        <p className="text-[11px] font-bold text-[#1a1a1a] tracking-wide">
          ISO 9001:2015
        </p>
        <p className="text-[7px] text-gray-600">Quality Management Systems</p>
      </div>

      {/* Certificate Details Table */}
      <div className="border border-gray-300 rounded-sm mb-3 mx-2">
        <div className="grid grid-cols-2 text-[7px]">
          <div className="border-b border-r border-gray-300 px-2 py-1 bg-gray-50 font-semibold">Certificate No</div>
          <div className="border-b border-gray-300 px-2 py-1">: NQA 2024 075892</div>
          
          <div className="border-b border-r border-gray-300 px-2 py-1 bg-gray-50 font-semibold">Date of Issue</div>
          <div className="border-b border-gray-300 px-2 py-1">: 2024-03-15</div>
          
          <div className="border-b border-r border-gray-300 px-2 py-1 bg-gray-50 font-semibold">Expiry Date</div>
          <div className="border-b border-gray-300 px-2 py-1">: 2027-03-14</div>
          
          <div className="border-r border-gray-300 px-2 py-1 bg-gray-50 font-semibold">Certification Period</div>
          <div className="px-2 py-1">: 3 Years</div>
        </div>
      </div>

      {/* Footer with Logo and Signature */}
      <div className="flex justify-between items-end px-3 mt-auto">
        {/* Accreditation Logo */}
        <div className="flex flex-col items-start">
          <div className="border border-gray-400 rounded px-1.5 py-1 mb-0.5">
            <p className="text-[8px] font-bold text-[#1a365d]">NQA</p>
            <p className="text-[5px] text-gray-600 leading-tight">Nepal Quality</p>
            <p className="text-[5px] text-gray-600 leading-tight">Assurance Board</p>
          </div>
          <p className="text-[5px] text-gray-500">Reg. No: NQA-2024-SG</p>
        </div>

        {/* Signature - Aanand Shrivastav */}
        <div className="text-center flex-1 mx-4">
          <svg width="90" height="35" viewBox="0 0 120 45" className="mb-0.5 mx-auto">
            {/* Stylized signature for Aanand Shrivastav */}
            <path 
              d="M8 28 Q12 15, 18 20 Q22 24, 26 18 Q30 12, 35 22 L38 28" 
              stroke="#1a1a1a" 
              strokeWidth="1.2" 
              fill="none"
              opacity="0.85"
            />
            <path 
              d="M35 22 Q42 8, 52 18 Q58 24, 62 16 Q68 8, 75 20" 
              stroke="#1a1a1a" 
              strokeWidth="1.2" 
              fill="none"
              opacity="0.85"
            />
            <path 
              d="M72 18 Q80 10, 88 22 Q92 28, 98 20 Q104 12, 112 24" 
              stroke="#1a1a1a" 
              strokeWidth="1.2" 
              fill="none"
              opacity="0.85"
            />
            {/* Underline flourish */}
            <path 
              d="M15 32 Q60 38, 105 32" 
              stroke="#1a1a1a" 
              strokeWidth="0.8" 
              fill="none"
              opacity="0.5"
            />
          </svg>
          <div className="border-t border-gray-400 w-24 mx-auto"></div>
          <p className="text-[7px] font-medium text-gray-700 mt-0.5">Aanand Shrivastav</p>
          <p className="text-[5px] text-gray-500">Authorized Signatory</p>
        </div>

        {/* Official Stamp */}
        <div className="flex flex-col items-end">
          <svg width="45" height="45" viewBox="0 0 60 60" className="mb-0.5">
            <circle cx="30" cy="30" r="26" fill="none" stroke="#1a365d" strokeWidth="1.5" opacity="0.6"/>
            <circle cx="30" cy="30" r="22" fill="none" stroke="#1a365d" strokeWidth="0.5" opacity="0.4"/>
            <text x="30" y="24" textAnchor="middle" fill="#1a365d" fontSize="5" fontWeight="bold" opacity="0.7">CERTIFIED</text>
            <text x="30" y="32" textAnchor="middle" fill="#1a365d" fontSize="7" fontWeight="bold" opacity="0.8">NQA</text>
            <text x="30" y="40" textAnchor="middle" fill="#1a365d" fontSize="4" opacity="0.6">2024</text>
          </svg>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="text-center mt-2 pt-1 border-t border-gray-200">
        <p className="text-[5px] text-gray-500 leading-tight">
          The authenticity of this certificate can be confirmed online or by e-mail to the Head Office via:
        </p>
        <p className="text-[5px] text-gray-500">
          Nepal Quality Assurance Board • Kathmandu, Nepal • www.nqa.gov.np • verify@nqa.gov.np
        </p>
      </div>

      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
        <svg width="200" height="200" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#1a365d" strokeWidth="1"/>
          <text x="50" y="45" textAnchor="middle" fill="#1a365d" fontSize="8" fontWeight="bold">CERTIFIED</text>
          <text x="50" y="55" textAnchor="middle" fill="#1a365d" fontSize="6">QUALITY</text>
        </svg>
      </div>
    </div>
  );
}
