import { getAllValueSetting, updateValueSetting } from "@/api/valueSetting";
import Layout from "@/components/Layout";
import TableCustom from "@/components/TableCustom";
import { DETAIL, TOWNHOUSE } from "@/constants/routes";
import { Button, Container, Input, NumberInput, Space, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Setting() {
  const navigate = useNavigate();
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    const getAllValueSettingAndSetToState = async () => {
      const response = await getAllValueSetting();
      setData(response?.data);
    };
    getAllValueSettingAndSetToState();
  }, []);
  const handleChangeSettingValue = async (setting: any, value: any) => {
    await updateValueSetting({ ...setting, value: value / 100 });
  };

  const renderInput = (setting: any) => {
    console.log(typeof setting.value);
    if (typeof setting.value === "number") {
      return (
        <>
          <NumberInput step={10} min={0} max={100} label={setting.description} defaultValue={setting.value * 100} onChange={(value) => handleChangeSettingValue(setting, value)} />
        </>
      );
    } else {
      return (
        <>
          <TextInput label={setting.name} defaultValue={setting.value} />
          <Button color="teal" onClick={() => navigate(`${TOWNHOUSE}/new`, { state: { action: "new" } })}>
            Lưu
          </Button>
        </>
      );
    }
  };

  return (
    <Container fluid style={{ paddingTop: 12 }}>
      {data.map((setting) => renderInput(setting))}
    </Container>
  );
}
