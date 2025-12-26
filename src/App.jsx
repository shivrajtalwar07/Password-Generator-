import { useState } from 'react';
import { Copy, RotateCcw } from 'lucide-react';

export default function PasswordGenerator() {
  const [length, setLength] = useState(12);
  const [password, setPassword] = useState('');

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
    let newPassword = '';
    for (let i = 0; i < length; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(newPassword);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
  };

  const increment = () => setLength(l => l + 1);
  const decrement = () => setLength(l => (l > 1 ? l - 1 : 1));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Password Generator</h1>

        {/* Password Display */}
        <div className="bg-gray-100 rounded-lg p-4 mb-6 min-h-12 flex items-center justify-between">
          <code className="text-lg font-mono text-gray-800 break-all">{password || 'Click Generate'}</code>
          {password && (
            <button
              onClick={copyToClipboard}
              className="ml-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              title="Copy password"
            >
              <Copy size={20} />
            </button>
          )}
        </div>

        {/* Length Control */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-4">Password Length: {length}</label>
          <div className="flex items-center gap-4">
            <button
              onClick={decrement}
              className="bg-red-500 hover:bg-red-600 text-white font-bold text-xl px-6 py-2 rounded-lg transition"
            >
              −
            </button>
            <input
              type="number"
              value={length}
              onChange={(e) => {
                const val = parseInt(e.target.value) || 1;
                setLength(val < 1 ? 1 : val);
              }}
              className="w-20 text-center text-lg font-bold border-2 border-gray-300 rounded px-2 py-1"
            />
            <button
              onClick={increment}
              className="bg-green-500 hover:bg-green-600 text-white font-bold text-xl px-6 py-2 rounded-lg transition"
            >
              +
            </button>
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={generatePassword}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-lg transition text-lg mb-4"
        >
          <RotateCcw className="inline mr-2" size={20} />
          Generate Password
        </button>

        {/* Info */}
        <p className="text-xs text-gray-600 text-center">Includes: Uppercase, Lowercase, Numbers & Special Characters</p>
      </div>
    </div>
  );
}