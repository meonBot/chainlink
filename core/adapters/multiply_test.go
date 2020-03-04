package adapters_test

import (
	"encoding/json"
	"testing"

	"chainlink/core/adapters"
	"chainlink/core/internal/cltest"

	"github.com/shopspring/decimal"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestMultiply_Marshal(t *testing.T) {
	tests := []struct {
		name string
		obj  adapters.Multiply
		exp  string
	}{
		{
			"w/ value",
			adapters.Multiply{Times: cltest.MustParseDecimalFromString(t, "3.142")},
			`{"times":"3.142"}`,
		},
		{
			"w/ value",
			adapters.Multiply{Times: decimal.NewFromInt(5)},
			`{"times":"5"}`,
		},
		{
			"w/o value",
			adapters.Multiply{},
			`{"times":"0"}`,
		},
	}

	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			buf, err := json.Marshal(tc.obj)
			require.NoError(t, err)
			require.Equal(t, tc.exp, string(buf))
		})
	}
}

func TestMultiply_Unmarshal(t *testing.T) {
	tests := []struct {
		name    string
		payload string
		exp     adapters.Multiply
	}{
		{
			"w/ value",
			`{"Times": 5}`,
			adapters.Multiply{Times: decimal.NewFromInt(5)},
		},
		{
			"w/o value",
			`{}`,
			adapters.Multiply{Times: decimal.NewFromInt(1)},
		},
	}

	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			var m adapters.Multiply
			err := json.Unmarshal([]byte(tc.payload), &m)
			require.NoError(t, err)
			require.Equal(t, tc.exp, m)
		})
	}
}

func TestMultiply_Perform(t *testing.T) {
	tests := []struct {
		name  string
		Times decimal.Decimal
		json  string
		want  string
	}{
		{"by 100", decimal.NewFromInt(100), `{"result":"1.23"}`, "123"},
		{"float", decimal.NewFromInt(100), `{"result":1.23}`, "123"},
		{"negative", decimal.NewFromInt(-5), `{"result":"1.23"}`, "-6.15"},
		{"no times parameter", decimal.NewFromInt(1), `{"result":"3.14"}`, "3.14"},
		{"zero", decimal.NewFromInt(0), `{"result":"1.23"}`, "0"},
	}

	for _, tt := range tests {
		test := tt
		t.Run(test.name, func(t *testing.T) {
			input := cltest.NewRunInputWithString(t, test.json)
			adapter := adapters.Multiply{Times: test.Times}
			result := adapter.Perform(input, nil)

			require.NoError(t, result.Error())
			assert.Equal(t, test.want, result.Result().String())
		})
	}
}

func TestMultiply_Perform_Failure(t *testing.T) {
	tests := []struct {
		name  string
		Times decimal.Decimal
		json  string
		want  string
	}{
		{"object", decimal.NewFromInt(100), `{"result":{"foo":"bar"}}`, ""},
	}

	for _, tt := range tests {
		test := tt
		t.Run(test.name, func(t *testing.T) {
			input := cltest.NewRunInputWithString(t, test.json)
			adapter := adapters.Multiply{Times: test.Times}
			result := adapter.Perform(input, nil)
			require.Error(t, result.Error())
		})
	}
}
