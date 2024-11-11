"use client";

type PasswordRatingProps = {
  password: string;
};

export const PasswordRating = ({ password }: PasswordRatingProps) => {
  // Password validation criteria
  const passwordCriteria = [
    { regex: /.{8,}/, label: "ความยาวอย่างน้อย 8 ตัว" },
    { regex: /[A-Z]/, label: "ตัวพิมพ์ใหญ่" },
    { regex: /[a-z]/, label: "ตัวพิมพ์เล็ก" },
    { regex: /\d/, label: "ตัวเลข" },
    { regex: /[!@#$%^&*_]/, label: "ตัวอักษรพิเศษ" },
  ];

  // Calculate the number of criteria met
  const strengthScore = passwordCriteria.reduce((score, criterion) => {
    return criterion.regex.test(password) ? score + 1 : score;
  }, 0);

  // Determine the progress bar width and color based on the score
  const strengthPercentage = (strengthScore / passwordCriteria.length) * 100;
  const getStrengthColor = () => {
    if (strengthPercentage === 100) return "bg-green-500";
    if (strengthPercentage >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };
  return (
    <div className="absolute top-6 sm:top-8 w-full mt-3 h-[11px] -z-10 bg-gray-200 rounded-b-full">
      <div
        className={`h-full ${getStrengthColor()} rounded-b-full`}
        style={{ width: `${strengthPercentage}%` }}
      />
    </div>
  );
};
