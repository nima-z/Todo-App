import Avatar_1 from "../../assets/avatars/Avatar-1.svg";
import Avatar_2 from "../../assets/avatars/Avatar-2.svg";
import Avatar_3 from "../../assets/avatars/Avatar-3.svg";
import Avatar_4 from "../../assets/avatars/Avatar-4.svg";
import Avatar_5 from "../../assets/avatars/Avatar-5.svg";
import Avatar_6 from "../../assets/avatars/Avatar-6.svg";
import Avatar_7 from "../../assets/avatars/Avatar-7.svg";
import Avatar_8 from "../../assets/avatars/Avatar-8.svg";

export function svg(index) {
  const avatarsSVG = [
    Avatar_1,
    Avatar_2,
    Avatar_3,
    Avatar_4,
    Avatar_5,
    Avatar_6,
    Avatar_7,
    Avatar_8,
  ];

  const avatar = avatarsSVG[index];
  return avatar;
}
