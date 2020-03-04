package adapters

import (
	"encoding/json"

	"github.com/shopspring/decimal"
)

// Multiply holds the a number to multiply the given value by.
type Multiply struct {
	Times decimal.Decimal `json:"-"`
}

type jsonMultiply struct {
	Times decimal.Decimal `json:"times,omitempty"`
}

// MarshalJSON implements the json.Marshal interface.
func (ma Multiply) MarshalJSON() ([]byte, error) {
	jsonObj := jsonMultiply{Times: ma.Times}
	return json.Marshal(jsonObj)
}

// UnmarshalJSON implements the json.Unmarshal interface.
func (ma *Multiply) UnmarshalJSON(buf []byte) error {
	jsonObj := jsonMultiply{
		decimal.NewFromInt(1), // default value
	}
	err := json.Unmarshal(buf, &jsonObj)
	if err != nil {
		return err
	}
	ma.Times = jsonObj.Times
	return nil
}
