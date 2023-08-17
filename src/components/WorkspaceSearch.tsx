import { useContext, useState } from "react";
import { ConfigContext } from "./ConfigProvider";

const WorkspaceSearchComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter workspace ID"
      />
    </div>
  );
}

export const WorkspaceSearch = () =>  {
  const { organizationId } = useContext(ConfigContext);

  if (organizationId) {
    return <WorkspaceSearchComponent />;
  }

  return null;
}