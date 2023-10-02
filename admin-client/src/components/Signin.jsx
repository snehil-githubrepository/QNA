import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Card, CardContent, Typography } from "@mui/material";

export const Signin = () => {
  return (
    <div>
      <div
        style={{
          paddingTop: 150,
          marginBottom: 10,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography style={{ fontFamily: "fantasy" }} variant={"h3"}>
          <span
            style={{
              backgroundColor: "#4FFFB0",
              padding: 10,
              boxSizing: "border-box",
              borderRadius: "3%",
              border: "2px solid black",
            }}
          >
            QNA Admin Log In
          </span>
        </Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card
          varint={"outlined"}
          style={{ width: 400, padding: 20, margin: 10 }}
        >
          <CardContent>
            <TextField fullWidth={true} label="Email" variant="outlined" />
            <br />
            <br />
            <TextField
              fullWidth={true}
              label="Password"
              variant="outlined"
              type={"password"}
            />
          </CardContent>
          <br />
          <br />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button size={"large"} variant="contained">
              Log In
            </Button>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <h3>
              {" "}
              Not Signed Up Yet ?
              <Button
                size={"large"}
                variant="primary"
                // onClick={navigate("/signup")}
              >
                Sign Up
              </Button>
            </h3>
          </div>
        </Card>
      </div>
    </div>
  );
};
