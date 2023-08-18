import './App.css';
import {OrganizationSearch} from './components/OrganizationSearch';
import PromptInput from './components/PromptInput';
import { ConfigProvider } from './components/ConfigProvider';
import { WorkspaceSearch } from './components/WorkspaceSearch';
import { IndustrySelect } from './components/IndustrySelect';
import { Container, Grid } from '@mui/material';
import { TableView } from './components/TableView';

function App() {
  return (
    <ConfigProvider>
      <Container maxWidth="md" className="wrapper">
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <OrganizationSearch />
          </Grid>
          <Grid item xs={4}>
            <WorkspaceSearch />
          </Grid>
          <Grid item xs={4}>
            <IndustrySelect/>
          </Grid>
          <Grid item xs={12}>
            <PromptInput />
          </Grid>
        </Grid>
        <TableView/>
      </Container>
    </ConfigProvider>
  );
}

export default App;
