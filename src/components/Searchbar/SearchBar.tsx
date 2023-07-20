import { TextInput, TextInputProps, ActionIcon, useMantineTheme, Paper, Flex } from "@mantine/core";
import { IconSearch, IconArrowRight, IconArrowLeft, IconBed, IconMail, IconPhone, IconUser } from "@tabler/icons";
import { useLocation } from "react-router-dom";
import { searchOrderRoom } from "@/api/order";
import { useRef } from "react";
import { searchOrderVillaTownHouse } from "@/api/orderTownhouse";
interface Props {
  setOders: any;
  currentAssert: string;
  getAllOrders: any;
}
export function SearchBar(props: Props) {
  const theme = useMantineTheme();
  const router = useLocation();
  const roomRef = useRef<HTMLInputElement | null>(null); // Ad
  const emailRef = useRef<HTMLInputElement | null>(null); // Add explicit typing for emailRef
  const phoneNumberRef = useRef<HTMLInputElement | null>(null); // Add explicit typing for phoneNumberRef
  const userNameRef = useRef<HTMLInputElement | null>(null);
  const handleSearchOrder = async () => {
    const roomNumber = roomRef.current?.value;
    const email = emailRef.current?.value; // Add null check
    const phoneNumber = phoneNumberRef.current?.value; // Add null check
    const userName = userNameRef.current?.value;
    console.log(email, phoneNumber, userName, roomNumber);
    if (email || phoneNumber || userName || roomNumber) {
      if (router.pathname.includes("hotel")) {
        const response = await searchOrderRoom(props.currentAssert, roomNumber?.split(",") || [], email || "", phoneNumber || "", userName || "");
        props.setOders(response);
      } else {
        const response = await searchOrderVillaTownHouse(props.currentAssert, email || "", phoneNumber || "", userName || "");
        props.setOders(response);
      }
    } else props.getAllOrders();
  };

  const inputStyle = {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderRight: 0,
  };

  return (
    <Flex style={{ display: "flex", alignItems: "center" }}>
      {router.pathname.includes("hotel") && (
        <TextInput
          icon={<IconBed size={18} stroke={1.5} />}
          size="sm"
          placeholder="Nhập số phòng "
          {...props}
          w={"35%"}
          ref={roomRef}
          style={{ ...inputStyle, borderTopLeftRadius: "xl", borderBottomLeftRadius: "xl", paddingRight: 0, borderRight: "none" }}
        />
      )}
      <TextInput
        icon={<IconMail size={18} stroke={1.5} />}
        size="sm"
        placeholder="Nhập mail"
        ref={emailRef} // Assign the ref to the email input
        {...props}
        w={"35%"}
        style={{ ...inputStyle, borderTopLeftRadius: "xl", borderBottomLeftRadius: "xl", paddingRight: 0, borderRight: "none" }}
      />

      <TextInput
        icon={<IconPhone size={18} stroke={1.5} />}
        size="sm"
        placeholder="Nhập số điện thoại"
        ref={phoneNumberRef} // Assign the ref to the phone number input
        {...props}
        w={"35%"}
        style={{ ...inputStyle, borderTopLeftRadius: "xl", borderBottomLeftRadius: "xl", paddingRight: 0, borderRight: "none" }}
      />
      <TextInput
        icon={<IconUser size={18} stroke={1.5} />}
        size="sm"
        placeholder="Nhập tên người dùng"
        ref={userNameRef} // Assign the ref to the username input
        {...props}
        w={"35%"}
        style={{ ...inputStyle, borderTopLeftRadius: "xl", borderBottomLeftRadius: "xl", paddingRight: 0, borderRight: "none" }}
      />

      <ActionIcon size={30} radius="xl" color={"teal"} variant="filled" onClick={handleSearchOrder}>
        {theme.dir === "ltr" ? <IconArrowRight size={18} stroke={1.5} /> : <IconArrowLeft size={18} stroke={1.5} />}
      </ActionIcon>
    </Flex>
  );
}
